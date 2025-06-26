import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";

const checkOutSchema = z.object({
  checkOutTime: z.string().transform((str) => new Date(str)),
  checkOutCoordinates: z.object({
    lat: z.number(),
    lng: z.number()
  }).optional(),
  checkOutMethod: z.enum(["QR_CODE", "GPS_ONLY", "MANUAL_OVERRIDE", "FACIAL_RECOGNITION"]),
  checkOutPhoto: z.string().optional(),
});

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const body = await request.json();
    const validatedData = checkOutSchema.parse(body);

    const attendanceId = params.id;

    // Get the existing attendance record
    const attendance = await prisma.attendance.findUnique({
      where: { id: attendanceId },
      include: {
        deployment: {
          include: {
            location: {
              select: {
                coordinates: true,
                gpsRadius: true
              }
            }
          }
        }
      }
    });

    if (!attendance) {
      return NextResponse.json(
        { error: "Attendance record not found" },
        { status: 404 }
      );
    }

    if (attendance.status !== "CHECKED_IN") {
      return NextResponse.json(
        { error: "User is not currently checked in" },
        { status: 400 }
      );
    }

    // Validate GPS coordinates for checkout if provided
    if (validatedData.checkOutCoordinates && attendance.deployment.location.coordinates) {
      const locationCoords = attendance.deployment.location.coordinates as { lat: number; lng: number };
      const distance = calculateDistance(
        validatedData.checkOutCoordinates.lat,
        validatedData.checkOutCoordinates.lng,
        locationCoords.lat,
        locationCoords.lng
      );
      if (distance > attendance.deployment.location.gpsRadius) {
        return NextResponse.json(
          { error: "You are too far from the assigned location to check out" },
          { status: 400 }
        );
      }
    }

    // Calculate hours worked
    const hoursWorked = (validatedData.checkOutTime.getTime() - attendance.checkInTime.getTime()) / (1000 * 60 * 60);
    
    // Calculate overtime (assuming 8 hours is standard)
    const overtimeHours = Math.max(0, hoursWorked - 8);

    const updatedAttendance = await prisma.attendance.update({
      where: { id: attendanceId },
      data: {
        checkOutTime: validatedData.checkOutTime,
        checkOutCoordinates: validatedData.checkOutCoordinates,
        checkOutMethod: validatedData.checkOutMethod,
        checkOutPhoto: validatedData.checkOutPhoto,
        hoursWorked: Math.round(hoursWorked * 100) / 100, // Round to 2 decimal places
        overtimeHours: Math.round(overtimeHours * 100) / 100,
        status: "CHECKED_OUT"
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
                name: true,
                baseRate: true,
                overtimeRate: true
              }
            }
          }
        }
      }
    });

    return NextResponse.json(updatedAttendance);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }
    console.error("Error checking out:", error);
    return NextResponse.json(
      { error: "Failed to check out" },
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
