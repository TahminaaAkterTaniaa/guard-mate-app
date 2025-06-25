///guard-mate-app/src/app/(auth)/layout.tsx

'use client'

import { Inter } from 'next/font/google'
import { ReactNode } from 'react'

const inter = Inter({ subsets: ['latin'] })

interface AuthLayoutProps {
  children: ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className={`${inter.className} bg-primary text-foreground`}>

        {children}

    </div>
  )
}
