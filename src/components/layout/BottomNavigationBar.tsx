'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

// Import existing icon components from public/icons folder
import HomeIcon from '../../../public/icons/HomeIcon'
import DocumentIcon from '../../../public/icons/operationIcon'
import HrmIcon from '../../../public/icons/hrmIcon'
import ProfileIcon from '../../../public/icons/userIcon'
import SettingIcon from '../../../public/icons/settingIcon'

// Import color constants
import colors from '../../../src/constants/colors'

const navItems = [
  { label: 'Home', href: '/home', icon: HomeIcon },
  { label: 'Jobs', href: '/jobs', icon: DocumentIcon },
  { label: 'HRM', href: '/hrm', icon: HrmIcon },
  { label: 'Profile', href: '/profile', icon: ProfileIcon },
  { label: 'Settings', href: '/settings', icon: SettingIcon },
]

export default function BottomNavigationBar() {
  const pathname = usePathname()

  // Custom renderer for each icon component based on its expected props
  const renderIcon = (label: string, isActive: boolean) => {
    // Use primary color from constants
    const primaryColor = colors.primary
    
    switch (label) {
      case 'Home':
        return <HomeIcon active={isActive} />
      case 'Jobs':
        return <DocumentIcon active={isActive} />
      case 'HRM':
        return <HrmIcon active={isActive} />
      case 'Profile':
        return <ProfileIcon active={isActive} />
      case 'Settings':
        return <SettingIcon active={isActive} />
      default:
        return null
    }
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 flex justify-around items-center max-w-[430px] mx-auto z-50">
      {navItems.map(({ label, href }) => {
        // Compare exact path match for current route
        const isActive = pathname === href
        
        return (
          <Link href={href} key={label}>
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center justify-center w-10 h-10">
                {renderIcon(label, isActive)}
              </div>
              <span className={clsx(
                'text-[10px]', 
                isActive 
                  ? 'text-primary font-medium' 
                  : 'text-[#596D79]'
              )}>
                {label}
              </span>
            </div>
          </Link>
        )
      })}
    </nav>
  )
}
