import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";

const createLeaveRequestSchema = z.object({
  companyId: z.string(),
  userId: z.string(),
  leaveType: z.enum(["ANNUAL_LEAVE", "MEDICAL_LEAVE", "EMERGENCY_LEAVE", "UNPAID_LEAVE", "MATERNITY_LEAVE", "PATERNITY_LEAVE"]),
  startDate: z.string().transform((str) => new Date(str)),
  endDate: z.string().transform((str) => new Date(str)),
  reason: z.string().min(1),
  documents: z.array(z.string()).optional(),
  emergencyContact: z.string().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const companyId = searchParams.get("companyId");
    const userId = searchParams.get("userId");
    const status = searchParams.get("status");

    const where: any = {};
    if (companyId) where.companyId = companyId;
    if (userId) where.userId = userId;
    if (status) where.status = status;

    const leaveRequests = await prisma.leaveRequest.findMany({
      where,
      include: {
        user: { select: { firstName: true, lastName: true, email: true } },
        company: { select: { name: true } }
      },
      orderBy: { appliedAt: "desc" }
    });

    return NextResponse.json({ leaveRequests });
  } catch (error) {
    console.error("Error fetching leave requests:", error);
    return NextResponse.json({ error: "Failed to fetch leave requests" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = createLeaveRequestSchema.parse(body);
    
    const totalDays = Math.ceil((validatedData.endDate.getTime() - validatedData.startDate.getTime()) / (1000 * 60 * 60 * 24));

    const leaveRequest = await prisma.leaveRequest.create({
      data: {
        ...validatedData,
        totalDays,
        status: "PENDING",
        appliedAt: new Date(),
        // Convert documents array to JSON string as required by Prisma schema
        documents: validatedData.documents ? JSON.stringify(validatedData.documents) : null
      },
      include: {
        user: { select: { firstName: true, lastName: true, email: true } }
      }
    });

    return NextResponse.json(leaveRequest, { status: 201 });
  } catch (error) {
    console.error("Error creating leave request:", error);
    return NextResponse.json({ error: "Failed to create leave request" }, { status: 500 });
  }
}
