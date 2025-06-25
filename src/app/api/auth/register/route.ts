import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db'
import { hashPassword } from '@/lib/utils/auth-utils'

// Define validation schema for registration
const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters'),
  email: z.string().email('Invalid email format').optional().nullable(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  companyId: z.string().optional(),
  company: z.string().optional(),
  invitationCode: z.string().optional(),
  role: z.enum(['GUARD', 'MANAGER']).default('GUARD'),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    // Validate request body
    const validatedData = registerSchema.parse(body)
    
    // Check if user already exists
    const existingUser = await prisma.guard.findUnique({
      where: { phone: validatedData.phone },
    })
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this phone number already exists' },
        { status: 400 }
      )
    }
    
    // Hash the password
    const hashedPassword = await hashPassword(validatedData.password)
    
    // For now, we'll allow registration only for guards
    // In a production app, we'd need a more sophisticated system with company verification
    
    // Get or create company if new registration includes company name
    let companyId = validatedData.companyId
    
    if (!companyId && validatedData.company) {
      // This is a simplified approach - in production we'd need proper verification
      const company = await prisma.company.create({
        data: {
          name: validatedData.company,
          // Note: Company doesn't have a status field in the schema
          // We'll track company approval state in a different way
        },
      })
      companyId = company.id
    }
    
    // Create the user as a guard
    const newUser = await prisma.guard.create({
      data: {
        name: validatedData.name,
        phone: validatedData.phone,
        email: validatedData.email || '',
        password: hashedPassword, // Store the hashed password
        companyId: companyId || '',
        status: 'PENDING', // Require admin approval
      },
    })
    
    // Remove sensitive information before returning the user
    const { ...userWithoutSensitiveInfo } = newUser
    
    return NextResponse.json(
      { 
        message: 'Registration successful. Your account is pending approval.',
        user: userWithoutSensitiveInfo 
      },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid registration data', details: error.errors },
        { status: 400 }
      )
    }
    
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    )
  }
}
