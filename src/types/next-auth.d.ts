import type { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  /**
   * Extending the built-in session types
   */
  interface Session {
    user: {
      id: string
      role: string
      companyId: string
    } & DefaultSession['user']
  }

  /**
   * Extending the built-in user types
   */
  interface User {
    id: string
    role: string
    companyId: string
  }
}

declare module 'next-auth/jwt' {
  /**
   * Extending the built-in JWT types
   */
  interface JWT {
    id: string
    role: string
    companyId: string
  }
}
