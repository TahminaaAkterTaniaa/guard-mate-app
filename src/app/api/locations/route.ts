import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";

const createLocationSchema = z.object({
  companyId: z.string(),
  name: z.string().min(1),
  address: z.string().min(1),
  city: z.string().min(1),
  coordinates: z.object({
    lat: z.number(),
    lng: z.number()
  }).optional(),
  clientName: z.string().optional(),
  contactPerson: z.string().optional(),
  contactPhone: z.string().optional(),
  siteCode: z.string().min(1),
  gpsRadius: z.number().default(100),
  instructions: z.string().optional(),
  emergencyProcedure: z.string().optional(),
  equipmentList: z.string().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const companyId = searchParams.get("companyId");
    const isActive = searchParams.get("isActive");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const where: any = {};
    if (companyId) where.companyId = companyId;
    if (isActive !== null) where.isActive = isActive === "true";

    const [locations, total] = await Promise.all([
      prisma.location.findMany({
        where,
        skip,
        take: limit,
        include: {
          company: {
            select: { name: true }
          },
          _count: {
            select: {
              shifts: true,
              deployments: true,
              incidents: true,
              attendances: true,
            }
          }
        },
        orderBy: { createdAt: "desc" }
      }),
      prisma.location.count({ where })
    ]);

    return NextResponse.json({
      locations,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error("Error fetching locations:", error);
    return NextResponse.json(
      { error: "Failed to fetch locations" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = createLocationSchema.parse(body);

    // Check if site code already exists
    const existingLocation = await prisma.location.findUnique({
      where: { siteCode: validatedData.siteCode }
    });

    if (existingLocation) {
      return NextResponse.json(
        { error: "Location with this site code already exists" },
        { status: 400 }
      );
    }

    // Generate QR code for the location
    const qrCode = `GUARD_MATE_${validatedData.siteCode}_${Date.now()}`;

    const location = await prisma.location.create({
      data: {
        ...validatedData,
        qrCode,
        qrCodeExpiry: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
      },
      include: {
        company: {
          select: { name: true }
        }
      }
    });

    return NextResponse.json(location, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }
    console.error("Error creating location:", error);
    return NextResponse.json(
      { error: "Failed to create location" },
      { status: 500 }
    );
  }
}
