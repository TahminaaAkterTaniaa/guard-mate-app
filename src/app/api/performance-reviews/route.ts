import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";

const createPerformanceReviewSchema = z.object({
  userId: z.string(),
  reviewerId: z.string(),
  reviewPeriodStart: z.string().transform((str) => new Date(str)),
  reviewPeriodEnd: z.string().transform((str) => new Date(str)),
  
  // Required metrics
  attendanceScore: z.number().min(1).max(5),
  punctualityScore: z.number().min(1).max(5),
  performanceScore: z.number().min(1).max(5),
  incidentScore: z.number().min(1).max(5),
  clientFeedbackScore: z.number().min(1).max(5).optional(),
  
  // Overall rating
  overallRating: z.number().min(1).max(5),
  
  // Optional fields
  strengths: z.string().optional(),
  improvements: z.string().optional(),
  goals: z.string().optional(),
  
  // Status (defaults to 'draft' in the schema)
  status: z.enum(['draft', 'in_progress', 'completed']).optional(),
  submittedAt: z.string().transform(str => new Date(str)).optional(),
  acknowledgedAt: z.string().transform(str => new Date(str)).optional()
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
        user: { 
          select: { 
            id: true,
            firstName: true, 
            lastName: true, 
            email: true,
            employeeId: true 
          } 
        }
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
        status: validatedData.status || 'draft',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      include: {
        user: { 
          select: { 
            id: true,
            firstName: true, 
            lastName: true, 
            email: true,
            employeeId: true 
          } 
        }
      }
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error("Error creating performance review:", error);
    return NextResponse.json({ error: "Failed to create performance review" }, { status: 500 });
  }
}
