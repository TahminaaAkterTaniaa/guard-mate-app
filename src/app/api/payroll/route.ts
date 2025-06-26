import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const createPayrollSchema = z.object({
  companyId: z.string(),
  userId: z.string(),
  payPeriodStart: z.string().transform((str) => new Date(str)),
  payPeriodEnd: z.string().transform((str) => new Date(str)),
  baseRate: z.number().positive(),
  overtimeRate: z.number().positive(),
  hoursWorked: z.number().min(0),
  overtimeHours: z.number().min(0),
  deductions: z.number().min(0).optional(),
  bonuses: z.number().min(0).optional(),
  allowances: z.number().min(0).optional(),
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
      orderBy: { payPeriodEnd: "desc" }
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
    
    const basePay = validatedData.hoursWorked * validatedData.baseRate;
    const overtimePay = validatedData.overtimeHours * validatedData.overtimeRate;
    const grossPay = basePay + overtimePay + (validatedData.bonuses || 0) + (validatedData.allowances || 0);
    const netPay = grossPay - (validatedData.deductions || 0);

    const payroll = await prisma.payroll.create({
      data: {
        ...validatedData,
        basePay,
        overtimePay,
        grossPay,
        netPay,
        status: "PENDING",
        generatedAt: new Date()
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
