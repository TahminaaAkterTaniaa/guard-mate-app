import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const createCommunicationSchema = z.object({
  companyId: z.string(),
  senderId: z.string(),
  receiverId: z.string().optional(),
  locationId: z.string().optional(),
  subject: z.string().min(1),
  message: z.string().min(1),
  type: z.enum(["ANNOUNCEMENT", "ALERT", "NOTIFICATION", "MESSAGE", "REMINDER"]),
  priority: z.enum(["low", "medium", "high", "urgent"]).default("medium"),
  isRead: z.boolean().default(false),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const companyId = searchParams.get("companyId");
    const receiverId = searchParams.get("receiverId");
    const type = searchParams.get("type");
    const isRead = searchParams.get("isRead");

    const where: any = {};
    if (companyId) where.companyId = companyId;
    if (receiverId) where.receiverId = receiverId;
    if (type) where.type = type;
    if (isRead) where.isRead = isRead === "true";

    const communications = await prisma.communication.findMany({
      where,
      include: {
        sender: { select: { firstName: true, lastName: true, email: true } },
        receiver: { select: { firstName: true, lastName: true, email: true } },
        location: { select: { name: true, siteCode: true } }
      },
      orderBy: { sentAt: "desc" }
    });

    return NextResponse.json({ communications });
  } catch (error) {
    console.error("Error fetching communications:", error);
    return NextResponse.json({ error: "Failed to fetch communications" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = createCommunicationSchema.parse(body);

    const communication = await prisma.communication.create({
      data: {
        ...validatedData,
        sentAt: new Date()
      },
      include: {
        sender: { select: { firstName: true, lastName: true } },
        receiver: { select: { firstName: true, lastName: true } }
      }
    });

    return NextResponse.json(communication, { status: 201 });
  } catch (error) {
    console.error("Error creating communication:", error);
    return NextResponse.json({ error: "Failed to create communication" }, { status: 500 });
  }
}
