import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";

const createExpenseSchema = z.object({
  companyId: z.string(),
  userId: z.string(),
  amount: z.number().positive(),
  currency: z.string().default("USD"),
  category: z.enum(["TRAVEL", "MEALS", "ACCOMMODATION", "COMMUNICATION", "MEDICAL", "EQUIPMENT", "OTHER"]),
  description: z.string().min(1),
  receiptUrl: z.string().url().optional(),
  expenseDate: z.string().transform((str) => new Date(str)),
  locationId: z.string().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const companyId = searchParams.get("companyId");
    const userId = searchParams.get("userId");
    const status = searchParams.get("status");
    const category = searchParams.get("category");

    const where: any = {};
    if (companyId) where.companyId = companyId;
    if (userId) where.userId = userId;
    if (status) where.status = status;
    if (category) where.category = category;

    const expenses = await prisma.expense.findMany({
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
      orderBy: { expenseDate: "desc" }
    });

    return NextResponse.json({ expenses });
  } catch (error) {
    console.error("Error fetching expenses:", error);
    return NextResponse.json({ error: "Failed to fetch expenses" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = createExpenseSchema.parse(body);

    const expense = await prisma.expense.create({
      data: {
        ...validatedData,
        title: validatedData.description || 'Expense',  // Use description as title if not provided
        status: "PENDING",
        submittedAt: new Date()
      },
      include: {
        user: { select: { firstName: true, lastName: true, employeeId: true } },
        company: { select: { name: true } }
      }
    });

    return NextResponse.json(expense, { status: 201 });
  } catch (error) {
    console.error("Error creating expense:", error);
    return NextResponse.json({ error: "Failed to create expense" }, { status: 500 });
  }
}
