'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

// Import your icon components
import HomeIcon from '../../../public/icons/HomeIcon'
import DocumentIcon from '../../../public/icons/documentIcon' // Using DocumentIcon for Jobs
import HrmIcon from '../../../public/icons/hrmIcon'
import ProfileIcon from '../../../public/icons/profileIcon'
import SettingIcon from '../../../public/icons/settingIcon'

const navItems = [
  { label: 'Home', href: '/home', icon: HomeIcon },
  { label: 'Jobs', href: '/jobs', icon: DocumentIcon },
  { label: 'HRM', href: '/hrm', icon: HrmIcon },
  { label: 'Profile', href: '/profile', icon: ProfileIcon },
  { label: 'Settings', href: '/settings', icon: SettingIcon },
]

export default function BottomNavigationBar() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 flex justify-around items-center max-w-[430px] mx-auto z-50">
      {navItems.map(({ label, href, icon: Icon }) => {
        const isActive = pathname === href
        return (
          <Link href={href} key={label}>
            <div className="flex flex-col items-center gap-1">
              {label === 'Home' ? (
                <HomeIcon disable={!isActive} />
              ) : (
                // @ts-expect-error - Different icon components have different prop requirements
                <Icon />
              )}
              <span className={clsx('text-[10px]', isActive ? 'text-black' : 'text-gray-500')}>
                {label}
              </span>
            </div>
          </Link>
        )
      })}
    </nav>
  )
}
