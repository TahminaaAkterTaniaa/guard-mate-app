// app/(authenticated)/layout.tsx
'use client'

import TopProfileHeader from '@/components/layout/TopProfileHeader'
import BottomNavigationBar from '@/components/layout/BottomNavigationBar'
import { SessionProvider } from 'next-auth/react'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <div className="h-screen w-full flex flex-col bg-gray-50 relative">
        <TopProfileHeader />
        <main className="flex-1 overflow-y-auto pb-20">
          {children}
        </main>
        <BottomNavigationBar />
      </div>
    </SessionProvider>
  )
}
