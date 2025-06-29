import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";

const createInvoiceSchema = z.object({
  companyId: z.string(),
  clientId: z.string(),
  invoiceNumber: z.string(),
  amount: z.number().positive(),
  currency: z.string().default("USD"),
  description: z.string(),
  dueDate: z.string().transform((str) => new Date(str)),
  servicesPeriodStart: z.string().transform((str) => new Date(str)),
  servicesPeriodEnd: z.string().transform((str) => new Date(str)),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const companyId = searchParams.get("companyId");
    const status = searchParams.get("status");

    const where: any = {};
    if (companyId) where.companyId = companyId;
    if (status) where.status = status;

    const invoices = await prisma.invoice.findMany({
      where,
      include: {
        company: { select: { name: true } }
      },
      orderBy: { issuedAt: "desc" }
    });

    return NextResponse.json({ invoices });
  } catch (error) {
    console.error("Error fetching invoices:", error);
    return NextResponse.json({ error: "Failed to fetch invoices" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = createInvoiceSchema.parse(body);

    const invoice = await prisma.invoice.create({
      data: {
        companyId: validatedData.companyId,
        invoiceNumber: validatedData.invoiceNumber,
        billingPeriodStart: validatedData.servicesPeriodStart,
        billingPeriodEnd: validatedData.servicesPeriodEnd,
        dueDate: validatedData.dueDate,
        subtotal: validatedData.amount,
        taxAmount: 0, // No tax info in schema, set to 0 as default
        totalAmount: validatedData.amount,
        paidAmount: 0,
        status: "PENDING",
        issuedAt: new Date(),
        // Store extra fields as line items
        lineItems: JSON.stringify([
          {
            description: validatedData.description,
            amount: validatedData.amount,
            currency: validatedData.currency
          }
        ])
      },
      include: {
        company: { select: { name: true } }
      }
    });

    return NextResponse.json(invoice, { status: 201 });
  } catch (error) {
    console.error("Error creating invoice:", error);
    return NextResponse.json({ error: "Failed to create invoice" }, { status: 500 });
  }
}
