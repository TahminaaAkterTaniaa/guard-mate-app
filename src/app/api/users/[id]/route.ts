import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { z } from "zod";

const updateUserSchema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  email: z.string().email().optional(),
  phoneNumber: z.string().min(10).optional(),
  role: z.enum(["SUPER_ADMIN", "COMPANY_ADMIN", "MANAGER", "GUARD"]).optional(),
  password: z.string().min(6).optional(),
  employeeId: z.string().optional(),
  skills: z.array(z.string()).optional(),
  certifications: z.array(z.string()).optional(),
  hourlyRate: z.number().optional(),
  status: z.enum(["ACTIVE", "INACTIVE", "SUSPENDED"]).optional(),
  isAvailable: z.boolean().optional(),
  address: z.string().optional(),
  emergencyContact: z.string().optional(),
  emergencyPhone: z.string().optional(),
});

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const user = await prisma.user.findUnique({
      where: { id: params.id },
      include: {
        company: {
          select: { name: true }
        },
        deployments: {
          include: {
            shift: {
              include: {
                location: true
              }
            }
          },
          orderBy: { date: "desc" },
          take: 5
        },
        attendances: {
          include: {
            location: {
              select: { name: true }
            }
          },
          orderBy: { checkInTime: "desc" },
          take: 10
        },
        incidents: {
          orderBy: { reportedAt: "desc" },
          take: 5
        },
        leaveRequests: {
          orderBy: { appliedAt: "desc" },
          take: 5
        },
        _count: {
          select: {
            deployments: true,
            attendances: true,
            incidents: true,
            leaveRequests: true,
          }
        }
      }
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ...user,
      password: undefined // Remove password from response
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const body = await request.json();
    const validatedData = updateUserSchema.parse(body);

    // Hash password if provided
    const updateData: any = { ...validatedData };
    if (validatedData.password) {
      updateData.password = await bcrypt.hash(validatedData.password, 10);
    }

    // Check if email or phone already exists (excluding current user)
    if (validatedData.email || validatedData.phoneNumber) {
      const existingUser = await prisma.user.findFirst({
        where: {
          AND: [
            { id: { not: params.id } },
            {
              OR: [
                ...(validatedData.email ? [{ email: validatedData.email }] : []),
                ...(validatedData.phoneNumber ? [{ phoneNumber: validatedData.phoneNumber }] : [])
              ]
            }
          ]
        }
      });

      if (existingUser) {
        return NextResponse.json(
          { error: "User with this email or phone number already exists" },
          { status: 400 }
        );
      }
    }

    const user = await prisma.user.update({
      where: { id: params.id },
      data: updateData,
      include: {
        company: {
          select: { name: true }
        }
      }
    });

    return NextResponse.json({
      ...user,
      password: undefined // Remove password from response
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    await prisma.user.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
