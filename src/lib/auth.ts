////guard-mate-app/src/lib/auth.ts

import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
// Use PrismaAdapter only for user/account operations, not for authentication
// We'll keep the import but comment out its usage due to type compatibility issues
// import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from './db'
import bcrypt from 'bcryptjs'

export const authOptions: NextAuthOptions = {
  // Temporarily comment out adapter until type issues are resolved
  // adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET || "guardmate-very-secure-secret-key-123",
  debug: process.env.NODE_ENV !== 'production',
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
          // Try to find a user with the provided email
          const user = await prisma.user.findFirst({
            where: {
              email: credentials.email
            },
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              password: true,
              avatar: true,
              companyId: true,
              role: true,
            },
          })

          if (user) {
            // Verify password using bcryptjs
            const isPasswordValid = await bcrypt.compare(
              credentials.password,
              user.password as string
            )

            if (isPasswordValid) {
              return {
                id: user.id,
                name: `${user.firstName} ${user.lastName}`,
                email: user.email,
                image: user.avatar,
                companyId: user.companyId,
                role: user.role,
              }
            }
          }

          // If guard not found, try to find a manager
          const manager = await prisma.user.findFirst({
            where: {
              email: credentials.email,
              role: 'MANAGER'
            },
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              password: true,
              avatar: true,
              companyId: true,
              role: true,
            },
          })

          if (manager) {
            // Verify password using bcryptjs
            const isPasswordValid = await bcrypt.compare(
              credentials.password,
              manager.password as string
            )

            if (isPasswordValid) {
              return {
                id: manager.id,
                name: `${manager.firstName} ${manager.lastName}`,
                email: manager.email,
                image: manager.avatar,
                companyId: manager.companyId,
                role: manager.role,
              }
            }
          }

          // If no user found or password invalid
          return null
        } catch (error) {
          console.error('Authentication error:', error)
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
