// app/(authenticated)/layout.tsx
import TopProfileHeader from '@/components/layout/TopProfileHeader'
import BottomNavigationBar from '@/components/layout/BottomNavigationBar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen max-w-[430px] mx-auto flex flex-col bg-gray-50 relative">
      <TopProfileHeader />
      <main className="flex-1 overflow-y-auto pb-20">
        {children}
      </main>
      <BottomNavigationBar />
    </div>
  )
}
