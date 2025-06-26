import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const createDeploymentSchema = z.object({
  companyId: z.string(),
  shiftId: z.string(),
  userId: z.string(),
  locationId: z.string(),
  date: z.string().transform((str) => new Date(str)),
  startTime: z.string().transform((str) => new Date(str)),
  endTime: z.string().transform((str) => new Date(str)),
  assignedBy: z.string().optional(),
  notes: z.string().optional(),
  specialInstructions: z.string().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const companyId = searchParams.get("companyId");
    const userId = searchParams.get("userId");
    const locationId = searchParams.get("locationId");
    const status = searchParams.get("status");
    const date = searchParams.get("date");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const where: any = {};
    if (companyId) where.companyId = companyId;
    if (userId) where.userId = userId;
    if (locationId) where.locationId = locationId;
    if (status) where.status = status;
    if (date) {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);
      where.date = {
        gte: startOfDay,
        lte: endOfDay
      };
    }

    const [deployments, total] = await Promise.all([
      prisma.deployment.findMany({
        where,
        skip,
        take: limit,
        include: {
          company: {
            select: { name: true }
          },
          user: {
            select: { 
              id: true,
              firstName: true, 
              lastName: true, 
              email: true,
              phoneNumber: true,
              employeeId: true,
              avatar: true
            }
          },
          shift: {
            select: { 
              name: true, 
              startTime: true, 
              endTime: true,
              duration: true,
              baseRate: true
            }
          },
          location: {
            select: { 
              name: true, 
              address: true, 
              siteCode: true,
              coordinates: true
            }
          },
          attendances: {
            select: {
              id: true,
              checkInTime: true,
              checkOutTime: true,
              status: true,
              hoursWorked: true
            }
          }
        },
        orderBy: { date: "desc" }
      }),
      prisma.deployment.count({ where })
    ]);

    return NextResponse.json({
      deployments,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error("Error fetching deployments:", error);
    return NextResponse.json(
      { error: "Failed to fetch deployments" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = createDeploymentSchema.parse(body);

    // Check for conflicts - same user, same time
    const existingDeployment = await prisma.deployment.findFirst({
      where: {
        userId: validatedData.userId,
        date: validatedData.date,
        OR: [
          {
            startTime: {
              lte: validatedData.endTime
            },
            endTime: {
              gte: validatedData.startTime
            }
          }
        ]
      }
    });

    if (existingDeployment) {
      return NextResponse.json(
        { error: "User already has a deployment scheduled for this time" },
        { status: 400 }
      );
    }

    // Check user availability
    const user = await prisma.user.findUnique({
      where: { id: validatedData.userId },
      select: { isAvailable: true, status: true }
    });

    if (!user || !user.isAvailable || user.status !== "ACTIVE") {
      return NextResponse.json(
        { error: "User is not available for deployment" },
        { status: 400 }
      );
    }

    const deployment = await prisma.deployment.create({
      data: validatedData,
      include: {
        company: {
          select: { name: true }
        },
        user: {
          select: { 
            firstName: true, 
            lastName: true, 
            email: true,
            phoneNumber: true,
            employeeId: true
          }
        },
        shift: {
          select: { 
            name: true, 
            startTime: true, 
            endTime: true,
            duration: true
          }
        },
        location: {
          select: { 
            name: true, 
            address: true, 
            siteCode: true
          }
        }
      }
    });

    return NextResponse.json(deployment, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }
    console.error("Error creating deployment:", error);
    return NextResponse.json(
      { error: "Failed to create deployment" },
      { status: 500 }
    );
  }
}
