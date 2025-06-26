import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const createPerformanceReviewSchema = z.object({
  companyId: z.string(),
  userId: z.string(),
  reviewerId: z.string(),
  reviewPeriodStart: z.string().transform((str) => new Date(str)),
  reviewPeriodEnd: z.string().transform((str) => new Date(str)),
  overallRating: z.number().min(1).max(5),
  punctualityRating: z.number().min(1).max(5),
  professionalismRating: z.number().min(1).max(5),
  communicationRating: z.number().min(1).max(5),
  reliabilityRating: z.number().min(1).max(5),
  comments: z.string().optional(),
  strengths: z.string().optional(),
  areasForImprovement: z.string().optional(),
  goals: z.string().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const companyId = searchParams.get("companyId");
    const userId = searchParams.get("userId");
    const reviewerId = searchParams.get("reviewerId");

    const where: any = {};
    if (companyId) where.companyId = companyId;
    if (userId) where.userId = userId;
    if (reviewerId) where.reviewerId = reviewerId;

    const reviews = await prisma.performanceReview.findMany({
      where,
      include: {
        user: { select: { firstName: true, lastName: true, employeeId: true } },
        reviewer: { select: { firstName: true, lastName: true, email: true } },
        company: { select: { name: true } }
      },
      orderBy: { reviewPeriodEnd: "desc" }
    });

    return NextResponse.json({ reviews });
  } catch (error) {
    console.error("Error fetching performance reviews:", error);
    return NextResponse.json({ error: "Failed to fetch performance reviews" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = createPerformanceReviewSchema.parse(body);

    const review = await prisma.performanceReview.create({
      data: {
        ...validatedData,
        status: "DRAFT",
        createdAt: new Date()
      },
      include: {
        user: { select: { firstName: true, lastName: true, employeeId: true } },
        reviewer: { select: { firstName: true, lastName: true } }
      }
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error("Error creating performance review:", error);
    return NextResponse.json({ error: "Failed to create performance review" }, { status: 500 });
  }
}
