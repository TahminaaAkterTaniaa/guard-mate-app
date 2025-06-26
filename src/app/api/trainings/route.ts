import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const createTrainingSchema = z.object({
  companyId: z.string(),
  title: z.string().min(1),
  description: z.string(),
  type: z.enum(["SECURITY_BASICS", "FIRE_SAFETY", "FIRST_AID", "CUSTOMER_SERVICE", "EQUIPMENT_TRAINING", "COMPLIANCE", "OTHER"]),
  duration: z.number().positive(),
  isRequired: z.boolean().default(false),
  expiryMonths: z.number().positive().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const companyId = searchParams.get("companyId");
    const type = searchParams.get("type");
    const isRequired = searchParams.get("isRequired");

    const where: any = {};
    if (companyId) where.companyId = companyId;
    if (type) where.type = type;
    if (isRequired) where.isRequired = isRequired === "true";

    const trainings = await prisma.training.findMany({
      where,
      include: {
        company: { select: { name: true } },
        _count: { select: { enrollments: true } }
      },
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json({ trainings });
  } catch (error) {
    console.error("Error fetching trainings:", error);
    return NextResponse.json({ error: "Failed to fetch trainings" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = createTrainingSchema.parse(body);

    const training = await prisma.training.create({
      data: {
        ...validatedData,
        createdAt: new Date()
      }
    });

    return NextResponse.json(training, { status: 201 });
  } catch (error) {
    console.error("Error creating training:", error);
    return NextResponse.json({ error: "Failed to create training" }, { status: 500 });
  }
}
