'use client'
import Image from 'next/image'
import CustomBellIcon from '../../../public/icons/customBellIcon'
import { useSession } from 'next-auth/react'
import { format } from 'date-fns'

export default function TopProfileHeader() {
  // Get real user data from session
  const { data: session } = useSession()
  const userName = session?.user?.name || 'John Smith' // Fallback for preview
  
  // Format today's date as shown in Figma
  const today = new Date()
  // Format to match Figma exactly: Thursday, 26th June 2025
  const formattedDate = format(today, 'EEEE, do MMMM yyyy')
  
  return (
    <div className="flex flex-col w-full px-6 pt-6 pb-8 h-[152px] bg-primary justify-between">
      {/* User info and notification row */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-4">
          <div className="relative w-11 h-11 rounded-full bg-white overflow-hidden">
            <Image
              src="/images/avatar-placeholder.png"
              alt={userName || 'User'}
              width={44}
              height={44}
              className="object-cover rounded-full"
              priority
            />
          </div>
          <div className="text-white">
            <p className="text-xs font-light ">Welcome !</p>
            <p className="text-base font-bold font-lg">{userName}</p>
          </div>
        </div>
        <div className="relative">
          <div className="flex items-center justify-center bg-[#1E308A] rounded-full w-8 h-8">
            <CustomBellIcon size={24} color="#ffffff" showRings={true} className="hover:text-blue-500 transition-colors" />
          </div>
          {/* Notification dot */}
          <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full border border-[#1E308A]"></div>
        </div>
      </div>
      
      {/* Date row */}
      <div className="text-white text-sm font-light font-semibold">
        {formattedDate}
      </div>
    </div>
  )
}
