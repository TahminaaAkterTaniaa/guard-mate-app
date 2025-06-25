import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
// Use PrismaAdapter only for user/account operations, not for authentication
// We'll keep the import but comment out its usage due to type compatibility issues
// import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from './db'
import { verifyPassword } from './utils/auth-utils'

export const authOptions: NextAuthOptions = {
  // Temporarily comment out adapter until type issues are resolved
  // adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET || "guardmate-very-secure-secret-key-123",
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/login',
    signOut: '/logout',
    error: '/error',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          // Try to find a guard with the provided email
          const guard = await prisma.guard.findFirst({
            where: {
              email: credentials.email
            },
            select: {
              id: true,
              name: true,
              email: true,
              password: true, // Need to select password even if it causes TypeScript errors
              profilePictureUrl: true,
              companyId: true,
            },
          })

          if (guard) {
            // Verify password using bcryptjs
            // Use type assertion to handle the password field that TypeScript doesn't recognize
            const isValid = await verifyPassword(
              credentials.password, 
              (guard as any).password
            )
            if (!isValid) {
              console.log('Invalid guard password')
              return null
            }

            return {
              id: guard.id,
              name: guard.name,
              email: guard.email,
              image: guard.profilePictureUrl || null,
              role: 'GUARD',
              companyId: guard.companyId,
            }
          }

          // If not a guard, try to find as manager
          const manager = await prisma.manager.findFirst({
            where: {
              email: credentials.email
            },
            select: {
              id: true,
              name: true,
              email: true,
              password: true, // Need to select password even if it causes TypeScript errors
              profilePictureUrl: true,
              role: true,
              companyId: true,
            },
          })

          if (manager) {
            // Verify password using bcryptjs
            // Use type assertion to handle the password field that TypeScript doesn't recognize
            const isValid = await verifyPassword(
              credentials.password, 
              (manager as any).password
            )
            if (!isValid) {
              console.log('Invalid manager password')
              return null
            }

            return {
              id: manager.id,
              name: manager.name,
              email: manager.email,
              image: manager.profilePictureUrl || null,
              role: manager.role,
              companyId: manager.companyId,
            }
          }
          
          // No user found with the provided email
          console.log('No user found with email:', credentials.email)
          return null
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      }
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.id = user.id
        token.name = user.name
        token.email = user.email
        token.companyId = user.companyId
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role as string
        session.user.id = token.id as string
        session.user.name = token.name as string
        session.user.email = token.email as string
        session.user.companyId = token.companyId as string
      }
      return session
    },
  },
}
