import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const createIncidentSchema = z.object({
  companyId: z.string(),
  locationId: z.string(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  incidentType: z.enum([
    "SECURITY_BREACH",
    "SAFETY_HAZARD",
    "EQUIPMENT_ISSUE",
    "MEDICAL_EMERGENCY",
    "THEFT",
    "VANDALISM",
    "UNAUTHORIZED_ACCESS",
    "FIRE_EMERGENCY",
    "OTHER"
  ]),
  severity: z.enum(["CRITICAL", "HIGH", "MEDIUM", "LOW"]),
  coordinates: z.object({
    lat: z.number(),
    lng: z.number()
  }).optional(),
  occurredAt: z.string().transform((str) => new Date(str)),
  photos: z.array(z.string().url()).optional(),
  videos: z.array(z.string().url()).optional(),
  audioNotes: z.string().optional(),
  witnesses: z.array(z.object({
    name: z.string(),
    contact: z.string(),
    statement: z.string().optional()
  })).optional(),
  priority: z.enum(["low", "medium", "high", "critical"]).optional(),
  assignedTo: z.string().optional(),
  clientNotified: z.boolean().default(false),
  followUpRequired: z.boolean().default(false),
  followUpDate: z.string().transform(str => new Date(str)).optional(),
  followUpNotes: z.string().optional()
});

// Create a new partial schema without the fields we don't want to update
const updateIncidentSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  incidentType: z.enum(["SECURITY_BREACH", "SAFETY_HAZARD", "EQUIPMENT_ISSUE", "MEDICAL_EMERGENCY", "THEFT", "VANDALISM", "UNAUTHORIZED_ACCESS", "FIRE_EMERGENCY", "OTHER"]).optional(),
  severity: z.enum(["CRITICAL", "HIGH", "MEDIUM", "LOW"]).optional(),
  status: z.enum(["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"]).optional(),
  resolution: z.string().optional(),
  assignedTo: z.string().optional(),
  witnessStatements: z.string().optional(),
  securityFootage: z.boolean().optional(),
  followUpRequired: z.boolean().optional(),
  followUpDate: z.string().transform(str => new Date(str)).optional(),
  followUpNotes: z.string().optional()
})
  .extend({
    status: z.enum(["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"]).optional(),
    resolution: z.string().optional(),
    resolvedAt: z.string().transform(str => new Date(str)).optional()
  });

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const companyId = searchParams.get("companyId");
    const locationId = searchParams.get("locationId");
    const status = searchParams.get("status");
    const incidentType = searchParams.get("type");
    const severity = searchParams.get("severity");
    const assignedTo = searchParams.get("assignedTo");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const where: any = {};
    if (companyId) where.companyId = companyId;
    if (locationId) where.locationId = locationId;
    if (status) where.status = status;
    if (incidentType) where.incidentType = incidentType;
    if (severity) where.severity = severity;
    if (assignedTo) where.assignedTo = assignedTo;
    
    // Date range filter
    if (startDate || endDate) {
      where.occurredAt = {};
      if (startDate) where.occurredAt.gte = new Date(startDate);
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        where.occurredAt.lte = end;
      }
    }

    const [incidents, total] = await Promise.all([
      prisma.incident.findMany({
        where,
        skip,
        take: limit,
        include: {
          company: {
            select: { name: true }
          },
          location: {
            select: { 
              name: true, 
              siteCode: true,
              address: true
            }
          },
          reporter: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              phoneNumber: true
            }
          }
        },
        orderBy: { occurredAt: "desc" }
      }),
      prisma.incident.count({ where })
    ]);

    return NextResponse.json({
      incidents,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error("Error fetching incidents:", error);
    return NextResponse.json(
      { error: "Failed to fetch incidents" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const validatedData = createIncidentSchema.parse(body);

    // Check if location exists and belongs to the company
    const location = await prisma.location.findUnique({
      where: { id: validatedData.locationId },
      select: { companyId: true }
    });

    if (!location) {
      return NextResponse.json(
        { error: "Location not found" },
        { status: 404 }
      );
    }

    // If assignedTo is provided, verify the user exists and has appropriate role
    if (validatedData.assignedTo) {
      const assignedUser = await prisma.user.findUnique({
        where: { 
          id: validatedData.assignedTo,
          companyId: validatedData.companyId,
          role: { in: ["MANAGER", "COMPANY_ADMIN"] }
        }
      });

      if (!assignedUser) {
        return NextResponse.json(
          { error: "Assigned user not found or doesn't have permission" },
          { status: 400 }
        );
      }
    }

    const incident = await prisma.incident.create({
      data: {
        ...validatedData,
        reportedBy: session.user.id,
        status: "OPEN",
        priority: validatedData.priority || getDefaultPriority(validatedData.severity),
        reportedAt: new Date(),
        witnesses: validatedData.witnesses ? JSON.stringify(validatedData.witnesses) : undefined,
        photos: validatedData.photos ? JSON.stringify(validatedData.photos) : null,
        videos: validatedData.videos ? JSON.stringify(validatedData.videos) : "[]"
      },
      include: {
        company: { select: { name: true } },
        location: { select: { name: true, siteCode: true } },
        reporter: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            employeeId: true
          }
        }
      }
    });

    // Create audit log
    await prisma.auditLog.create({
      data: {
        action: "INCIDENT_CREATED",
        resource: "Incident",
        resourceId: incident.id,
        companyId: incident.companyId,
        userId: session.user.id,
        newValues: JSON.stringify(incident)
      }
    });

    return NextResponse.json(incident, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }
    console.error("Error creating incident:", error);
    return NextResponse.json(
      { error: "Failed to create incident" },
      { status: 500 }
    );
  }
}

// Helper function to determine default priority based on severity
function getDefaultPriority(severity: string): string {
  switch (severity) {
    case "CRITICAL":
      return "critical";
    case "HIGH":
      return "high";
    case "MEDIUM":
      return "medium";
    case "LOW":
    default:
      return "low";
  }
}
