'use client'
import Image from 'next/image'
import BellIcon from '../../../public/icons/bellIcon'

export default function TopProfileHeader() {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-[color:var(--colorKeys-primary)]">
      <div className="flex items-center gap-3">
        <Image
          src="/images/avatar-placeholder.png"
          alt="User"
          width={40}
          height={40}
          className="rounded-full"
        />
        <div className="text-white">
          <p className="text-xs opacity-70">Welcome back,</p>
          <p className="text-sm font-semibold">Alex</p>
        </div>
      </div>
      <div className="text-white">
        <BellIcon />
      </div>
    </div>
  )
}
