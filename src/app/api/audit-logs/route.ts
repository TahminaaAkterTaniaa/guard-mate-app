import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const createAuditLogSchema = z.object({
  companyId: z.string(),
  userId: z.string(),
  action: z.string(),
  resource: z.string(),
  resourceId: z.string(),
  oldValues: z.string().optional(),
  newValues: z.string().optional(),
  ipAddress: z.string().optional(),
  userAgent: z.string().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const companyId = searchParams.get("companyId");
    const userId = searchParams.get("userId");
    const resource = searchParams.get("resource");
    const action = searchParams.get("action");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");
    const skip = (page - 1) * limit;

    const where: any = {};
    if (companyId) where.companyId = companyId;
    if (userId) where.userId = userId;
    if (resource) where.resource = resource;
    if (action) where.action = action;
    
    if (startDate || endDate) {
      where.timestamp = {};
      if (startDate) where.timestamp.gte = new Date(startDate);
      if (endDate) where.timestamp.lte = new Date(endDate);
    }

    const [auditLogs, total] = await Promise.all([
      prisma.auditLog.findMany({
        where,
        skip,
        take: limit,
        include: {
          user: { select: { firstName: true, lastName: true, email: true } },
          company: { select: { name: true } }
        },
        orderBy: { timestamp: "desc" }
      }),
      prisma.auditLog.count({ where })
    ]);

    return NextResponse.json({
      auditLogs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error("Error fetching audit logs:", error);
    return NextResponse.json({ error: "Failed to fetch audit logs" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = createAuditLogSchema.parse(body);

    const auditLog = await prisma.auditLog.create({
      data: {
        ...validatedData,
        timestamp: new Date()
      }
    });

    return NextResponse.json(auditLog, { status: 201 });
  } catch (error) {
    console.error("Error creating audit log:", error);
    return NextResponse.json({ error: "Failed to create audit log" }, { status: 500 });
  }
}
