import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { z } from "zod";

const createUserSchema = z.object({
  companyId: z.string(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phoneNumber: z.string().min(10),
  role: z.enum(["SUPER_ADMIN", "COMPANY_ADMIN", "MANAGER", "GUARD"]),
  password: z.string().min(6).optional(),
  employeeId: z.string().optional(),
  skills: z.array(z.string()).optional(),
  certifications: z.array(z.string()).optional(),
  hourlyRate: z.number().optional(),
});

const updateUserSchema = createUserSchema.partial().omit({ companyId: true });

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const companyId = searchParams.get("companyId");
    const role = searchParams.get("role");
    const status = searchParams.get("status");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const where: any = {};
    if (companyId) where.companyId = companyId;
    if (role) where.role = role;
    if (status) where.status = status;

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        include: {
          company: {
            select: { name: true }
          },
          _count: {
            select: {
              deployments: true,
              attendances: true,
              incidents: true,
              leaveRequests: true,
            }
          }
        },
        orderBy: { createdAt: "desc" }
      }).then(users => 
        users.map(user => ({
          ...user,
          skills: user.skills ? JSON.parse(user.skills) : [],
          certifications: user.certifications ? JSON.parse(user.certifications) : []
        }))
      ),
      prisma.user.count({ where })
    ]);

    return NextResponse.json({
      users: users.map(user => ({
        ...user,
        password: undefined // Remove password from response
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = createUserSchema.parse(body);

    // Hash password if provided
    let hashedPassword;
    if (validatedData.password) {
      hashedPassword = await bcrypt.hash(validatedData.password, 10);
    }

    // Check if email or phone already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: validatedData.email },
          { phoneNumber: validatedData.phoneNumber }
        ]
      }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email or phone number already exists" },
        { status: 400 }
      );
    }

    // Convert arrays to JSON strings before saving
    const userData = {
      ...validatedData,
      password: hashedPassword,
      skills: validatedData.skills?.length ? JSON.stringify(validatedData.skills) : null,
      certifications: validatedData.certifications?.length ? JSON.stringify(validatedData.certifications) : null
    };

    const user = await prisma.user.create({
      data: userData,
      include: {
        company: {
          select: { name: true }
        }
      }
    });

    return NextResponse.json({
      ...user,
      password: undefined // Remove password from response
    }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
