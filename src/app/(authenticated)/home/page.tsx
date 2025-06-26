'use client'

import Image from 'next/image';
import Link from 'next/link';

// Import required icon components
import LocationIcon from '../../../../public/icons/mapPineLineIcon';
import SiteIcon from '../../../../public/icons/siteIcon';
import HrmIcon from '../../../../public/icons/hrmIcon';
import OperationIcon from '../../../../public/icons/operationIcon';
import CheckInIcon from '../../../../public/icons/checkInIcon';
import ProgressIcon from '../../../../public/icons/progressIcon';

export default function HomePage() {
  // Note: Date formatting is now handled in TopProfileHeader component
  
  return (
    <div className="w-full h-full bg-gray-50 px-4">
      {/* Map View Section */}
      <div className="relative w-full">
        {/* Map Container */}
        <div className="relative w-full overflow-hidden h-[459px] rounded-xl">
          {/* Map Background - using the specified map image */}
          <Image 
            src="/images/map.png" 
            alt="Map background" 
            width={388}
            height={459}
            className="w-full h-full object-cover"
            priority
          />
            
          {/* Map Controls */}
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-2">
            <div className="bg-white shadow rounded-md">
              <button 
                className="w-8 h-8 flex items-center justify-center text-gray-600"
                aria-label="Focus"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 1L8.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10.5 1H13V3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M1 13L5.5 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M1 10.5V13H3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <div className="h-px bg-gray-200"></div>
              <button 
                className="w-8 h-8 flex items-center justify-center text-gray-600"
                aria-label="Zoom in"
              >
                <span className="text-xl font-medium">+</span>
              </button>
              <div className="h-px bg-gray-200"></div>
              <button 
                className="w-8 h-8 flex items-center justify-center text-gray-600"
                aria-label="Zoom out"
              >
                <span className="text-xl font-medium">−</span>
              </button>
            </div>
          </div>

          {/* Site Marker */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Image 
              src="/images/mapIcon2.png"
              alt="Site location"
              width={50}
              height={50}
              className="drop-shadow-lg"
            />
          </div>
        </div>

        {/* Location Card Overlay */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-[260px]">
          <div className="bg-white rounded-2xl p-4 shadow-md">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex-shrink-0 text-primary">
                <SiteIcon />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-primary text-base">Site A</h3>
              </div>
            </div>
              
            <div className="flex items-start gap-2 mb-2.5 pl-1">
              <div className="flex-shrink-0 mt-1 text-gray-600">
                <LocationIcon />
              </div>
              <p className="text-sm text-gray-600 leading-tight">
                3891 Ranchview Dr.<br />
                Richardson, California 62639
              </p>
            </div>
              
            {/* Team Member Photos */}
            <div className="flex items-center mt-3 border-t border-gray-100 pt-3">
              <div className="flex -space-x-2">
                {/* Team member avatars using colored placeholders for now */}
                <div className="w-6 h-6 rounded-full bg-blue-500 border-2 border-white"></div>
                <div className="w-6 h-6 rounded-full bg-green-500 border-2 border-white"></div>
                <div className="w-6 h-6 rounded-full bg-red-500 border-2 border-white"></div>
                <div className="w-6 h-6 rounded-full bg-yellow-500 border-2 border-white"></div>
                <div className="w-6 h-6 rounded-full bg-purple-500 border-2 border-white"></div>
                <div className="w-6 h-6 rounded-full bg-gray-800 border-2 border-white flex items-center justify-center">
                  <span className="text-white text-[8px] font-medium">+3</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Panel - positioned to overlap with the map */}
      <div className="h-[200px] px-1 mt-[-90px] relative z-10">
        <div className="bg-primary01 rounded-xl shadow-sm divide-y divide-gray-100 h-full">
          {/* Location info section */}
          <div className="p-4">
            <div className="flex items-start gap-2">
              <div className="mt-0.5">
                <LocationIcon />
              </div>
              <p className="text-[15px] text-gray-700 leading-tight">
                3891 Ranchview Dr. Richardson,<br />
                California 62639
              </p>
            </div>
          </div>

          {/* Check in time section */}
          <div className="px-4 py-3.5 flex items-center gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <div className="text-primary">
                <CheckInIcon/>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Check In Time</p>
              <p className="text-xs text-gray-500">09:05</p>
            </div>
          </div>

          {/* Task Progress section */}
          <div className="px-4 py-3.5 flex items-center gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <div className="text-primary">
                <ProgressIcon />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <p className="text-sm font-medium text-gray-900">Task Progress</p>
                <span className="text-xs bg-blue-100 text-blue-800 font-medium px-2 py-0.5 rounded">388 + 459</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full w-[20%]"></div>
                </div>
                <span className="text-xs text-gray-500 font-medium">20%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons - properly positioned to account for overlapping status panel */}
      <div className="mt-12 grid grid-cols-2 gap-4">
        <Link href="/hrm" className="bg-white rounded-xl p-4 shadow-sm flex flex-col items-center justify-center h-24">
          <div className="text-primary mb-2">
            <HrmIcon />
          </div>
          <span className="text-sm font-medium text-primary">HRM</span>
        </Link>

        <Link href="/operations" className="bg-white rounded-xl p-4 shadow-sm flex flex-col items-center justify-center h-24">
          <div className="text-primary mb-2">
            <OperationIcon />
          </div>
          <span className="text-sm font-medium text-primary">Operations</span>
        </Link>
      </div>
    </div>
  );
}
