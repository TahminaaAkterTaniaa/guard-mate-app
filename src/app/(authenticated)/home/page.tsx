'use client'

import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';

// Import JS icon components - adjust paths as needed
import LocationIcon from '../../../../public/icons/locationIcon';
import BuildingIcon from '../../../../public/icons/buildingIcon';
import HrmIcon from '../../../../public/icons/hrmIcon';
import OpsIcon from '../../../../public/icons/opsIcon';

export default function HomePage() {
  // Format today's date for display
  const today = new Date();
  const formattedDate = format(today, 'EEEE, MMMM d, yyyy');
  
  return (
    <div className="pb-16 pt-2 px-4 overflow-y-auto">
      {/* Greeting and Date */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Hello, Alex!</h1>
        <p className="text-gray-500">{formattedDate}</p>
      </div>

      {/* Daily Briefing */}
      <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-100">
        <h2 className="font-semibold text-blue-800 mb-1">Daily Briefing</h2>
        <p className="text-sm text-gray-700">Review your tasks and schedule for today.</p>
      </div>

      {/* Map View with Current Site */}
      <div className="mb-6">
        <div className="relative rounded-lg overflow-hidden h-[180px] bg-gray-100 mb-4">
          <Image 
            src="/images/map-placeholder.png" 
            alt="Map view" 
            width={400}
            height={180}
            style={{
              objectFit: 'cover',
              width: '100%',
              height: '100%'
            }}
          />
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-2">Current Site</h3>
          <div className="flex items-center gap-2 mb-2">
            <div className="text-blue-700">
              <BuildingIcon />
            </div>
            <span>123 Business Building</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-blue-700">
              <LocationIcon />
            </div>
            <span className="text-sm text-gray-600">Downtown, City</span>
          </div>

          <div className="flex justify-between mt-3">
            <button className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium">
              View Details
            </button>
            <button className="border border-blue-700 text-blue-700 px-4 py-2 rounded-md text-sm font-medium">
              Check In
            </button>
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <h3 className="font-semibold text-gray-800 mb-3">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Link href="/hrm" 
          className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center shadow-sm">
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mb-2 text-blue-700">
            <HrmIcon />
          </div>
          <span className="text-sm font-medium text-gray-800">HRM</span>
        </Link>
        <Link href="/operations" 
          className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center shadow-sm">
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mb-2 text-blue-700">
            <OpsIcon />
          </div>
          <span className="text-sm font-medium text-gray-800">Operations</span>
        </Link>
      </div>
      
      {/* Check-in Information */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-800 mb-3">Check-In Information</h3>
        <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-100">
            <span className="text-gray-600">Status:</span>
            <span className="text-green-600 font-medium">Checked In</span>
          </div>
          <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-100">
            <span className="text-gray-600">Check-In Time:</span>
            <span className="font-medium">12:41 AM</span>
          </div>
        </div>
      </div>
      
      {/* Upcoming Shift */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-4">
        <div className="flex">
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">Upcoming Shift</h3>
            <div className="mt-1 text-xs text-yellow-700">
              Tomorrow: 9:00 AM - 5:00 PM at Commercial Plaza
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
