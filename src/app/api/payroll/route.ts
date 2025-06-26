import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";

const createPayrollSchema = z.object({
  companyId: z.string(),
  userId: z.string(),
  periodStart: z.string().transform((str) => new Date(str)),
  periodEnd: z.string().transform((str) => new Date(str)),
  payDate: z.string().transform((str) => new Date(str)),
  regularHours: z.number().min(0),
  overtimeHours: z.number().min(0),
  nightHours: z.number().min(0).default(0),
  regularEarnings: z.number().min(0),
  overtimeEarnings: z.number().min(0),
  nightEarnings: z.number().min(0).default(0),
  bonusEarnings: z.number().min(0).default(0),
  taxDeduction: z.number().min(0).default(0),
  otherDeductions: z.number().min(0).default(0),
  grossPay: z.number().min(0),
  netPay: z.number().min(0),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const companyId = searchParams.get("companyId");
    const userId = searchParams.get("userId");
    const status = searchParams.get("status");
    const payPeriod = searchParams.get("payPeriod");

    const where: any = {};
    if (companyId) where.companyId = companyId;
    if (userId) where.userId = userId;
    if (status) where.status = status;
    if (payPeriod) {
      const [year, month] = payPeriod.split("-");
      const startDate = new Date(parseInt(year), parseInt(month) - 1, 1);
      const endDate = new Date(parseInt(year), parseInt(month), 0);
      where.payPeriodStart = { gte: startDate };
      where.payPeriodEnd = { lte: endDate };
    }

    const payrollRecords = await prisma.payroll.findMany({
      where,
      include: {
        user: { 
          select: { 
            firstName: true, 
            lastName: true, 
            email: true, 
            employeeId: true 
          } 
        },
        company: { select: { name: true } }
      },
      orderBy: { periodEnd: "desc" }
    });

    return NextResponse.json({ payrollRecords });
  } catch (error) {
    console.error("Error fetching payroll records:", error);
    return NextResponse.json({ error: "Failed to fetch payroll records" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = createPayrollSchema.parse(body);
    
    const payroll = await prisma.payroll.create({
      data: {
        ...validatedData,
        status: "DRAFT",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      include: {
        user: { select: { firstName: true, lastName: true, employeeId: true } }
      }
    });

    return NextResponse.json(payroll, { status: 201 });
  } catch (error) {
    console.error("Error creating payroll record:", error);
    return NextResponse.json({ error: "Failed to create payroll record" }, { status: 500 });
  }
}
