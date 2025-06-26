import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";

const createShiftSchema = z.object({
  companyId: z.string(),
  locationId: z.string(),
  name: z.string().min(1),
  startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/), // HH:MM format
  endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
  duration: z.number().min(1),
  requiredGuards: z.number().min(1).default(1),
  requiredSkills: z.array(z.string()).default([]),
  isRecurring: z.boolean().default(false),
  daysOfWeek: z.array(z.string()).default([]),
  baseRate: z.number().optional(),
  overtimeRate: z.number().optional(),
  nightRate: z.number().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const companyId = searchParams.get("companyId");
    const locationId = searchParams.get("locationId");
    const isActive = searchParams.get("isActive");
    const isRecurring = searchParams.get("isRecurring");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const where: any = {};
    if (companyId) where.companyId = companyId;
    if (locationId) where.locationId = locationId;
    if (isActive !== null) where.isActive = isActive === "true";
    if (isRecurring !== null) where.isRecurring = isRecurring === "true";

    const [shifts, total] = await Promise.all([
      prisma.shift.findMany({
        where,
        skip,
        take: limit,
        include: {
          company: {
            select: { name: true }
          },
          location: {
            select: { name: true, address: true, siteCode: true }
          },
          _count: {
            select: {
              deployments: true
            }
          }
        },
        orderBy: { createdAt: "desc" }
      }).then(shifts => 
        shifts.map(shift => ({
          ...shift,
          requiredSkills: shift.requiredSkills ? JSON.parse(shift.requiredSkills) : [],
          daysOfWeek: shift.daysOfWeek ? JSON.parse(shift.daysOfWeek) : []
        }))
      ),
      prisma.shift.count({ where })
    ]);

    return NextResponse.json({
      shifts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error("Error fetching shifts:", error);
    return NextResponse.json(
      { error: "Failed to fetch shifts" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = createShiftSchema.parse(body);

    // Calculate duration if not provided
    if (!validatedData.duration) {
      const [startHour, startMin] = validatedData.startTime.split(':').map(Number);
      const [endHour, endMin] = validatedData.endTime.split(':').map(Number);
      const startMinutes = startHour * 60 + startMin;
      const endMinutes = endHour * 60 + endMin;
      validatedData.duration = endMinutes - startMinutes;
      
      // Handle overnight shifts
      if (validatedData.duration < 0) {
        validatedData.duration += 24 * 60;
      }
    }

    // Convert arrays to JSON strings before saving
    const shiftData = {
      ...validatedData,
      requiredSkills: validatedData.requiredSkills.length > 0 
        ? JSON.stringify(validatedData.requiredSkills) 
        : null,
      daysOfWeek: validatedData.daysOfWeek.length > 0 
        ? JSON.stringify(validatedData.daysOfWeek) 
        : null,
    };

    const shift = await prisma.shift.create({
      data: shiftData,
      include: {
        company: {
          select: { name: true }
        },
        location: {
          select: { name: true, address: true, siteCode: true }
        }
      }
    });

    return NextResponse.json(shift, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }
    console.error("Error creating shift:", error);
    return NextResponse.json(
      { error: "Failed to create shift" },
      { status: 500 }
    );
  }
}
