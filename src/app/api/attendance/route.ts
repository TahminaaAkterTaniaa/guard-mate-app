import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

const createAttendanceSchema = z.object({
  companyId: z.string(),
  userId: z.string(),
  deploymentId: z.string(),
  locationId: z.string(),
  checkInTime: z.string().transform((str) => new Date(str)),
  checkInCoordinates: z.object({
    lat: z.number(),
    lng: z.number()
  }).optional(),
  checkInMethod: z.enum(["QR_CODE", "GPS_ONLY", "MANUAL_OVERRIDE", "FACIAL_RECOGNITION"]),
  checkInPhoto: z.string().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const companyId = searchParams.get("companyId");
    const userId = searchParams.get("userId");
    const locationId = searchParams.get("locationId");
    const deploymentId = searchParams.get("deploymentId");
    const status = searchParams.get("status");
    const date = searchParams.get("date");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const where: any = {};
    if (companyId) where.companyId = companyId;
    if (userId) where.userId = userId;
    if (locationId) where.locationId = locationId;
    if (deploymentId) where.deploymentId = deploymentId;
    if (status) where.status = status;
    if (date) {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);
      where.checkInTime = {
        gte: startOfDay,
        lte: endOfDay
      };
    }

    const [attendances, total] = await Promise.all([
      prisma.attendance.findMany({
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
          deployment: {
            select: {
              id: true,
              date: true,
              startTime: true,
              endTime: true,
              shift: {
                select: {
                  name: true,
                  baseRate: true,
                  overtimeRate: true
                }
              }
            }
          },
          location: {
            select: { 
              name: true, 
              address: true, 
              siteCode: true,
              coordinates: true,
              gpsRadius: true
            }
          }
        },
        orderBy: { checkInTime: "desc" }
      }),
      prisma.attendance.count({ where })
    ]);

    return NextResponse.json({
      attendances,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error("Error fetching attendances:", error);
    return NextResponse.json(
      { error: "Failed to fetch attendances" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const body = await request.json();
    const validatedData = createAttendanceSchema.parse(body);

    // Check if deployment exists and is valid
    const deployment = await prisma.deployment.findUnique({
      where: { id: validatedData.deploymentId },
      include: {
        location: {
          select: {
            coordinates: true,
            gpsRadius: true,
            qrCode: true
          }
        }
      }
    });

    if (!deployment) {
      return NextResponse.json(
        { error: "Deployment not found" },
        { status: 404 }
      );
    }

    // Validate GPS coordinates if provided
    let isGpsValid = false;
    if (validatedData.checkInCoordinates && deployment.location.coordinates) {
      const locationCoords = deployment.location.coordinates as { lat: number; lng: number };
      const distance = calculateDistance(
        validatedData.checkInCoordinates.lat,
        validatedData.checkInCoordinates.lng,
        locationCoords.lat,
        locationCoords.lng
      );
      isGpsValid = distance <= deployment.location.gpsRadius;
    }

    // Check if user already has an active attendance for this deployment
    const existingAttendance = await prisma.attendance.findFirst({
      where: {
        deploymentId: validatedData.deploymentId,
        status: "CHECKED_IN"
      }
    });

    if (existingAttendance) {
      return NextResponse.json(
        { error: "User already checked in for this deployment" },
        { status: 400 }
      );
    }

    const attendance = await prisma.attendance.create({
      data: {
        ...validatedData,
        isGpsValid,
        isQrValid: validatedData.checkInMethod === "QR_CODE",
        isFaceValid: validatedData.checkInMethod === "FACIAL_RECOGNITION",
        requiresApproval: !isGpsValid && validatedData.checkInMethod === "GPS_ONLY",
        status: "CHECKED_IN"
      },
      include: {
        user: {
          select: { 
            firstName: true, 
            lastName: true, 
            employeeId: true
          }
        },
        location: {
          select: { 
            name: true, 
            siteCode: true
          }
        },
        deployment: {
          select: {
            shift: {
              select: {
                name: true
              }
            }
          }
        }
      }
    });

    return NextResponse.json(attendance, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }
    console.error("Error creating attendance:", error);
    return NextResponse.json(
      { error: "Failed to create attendance record" },
      { status: 500 }
    );
  }
}

// Helper function to calculate distance between two GPS coordinates
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371000; // Earth's radius in meters
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}
