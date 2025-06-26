'use client'

import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';

// Import required icon components
import LocationIcon from '../../../../public/icons/locationIcon';
import SiteIcon from '../../../../public/icons/siteIcon';
import HrmIcon from '../../../../public/icons/hrmIcon';
import OperationIcon from '../../../../public/icons/operationIcon';
import ClockIcon from '../../../../public/icons/clockIcon';
import ProgressIcon from '../../../../public/icons/progressIcon';
import PlusIcon from '../../../../public/icons/plusIcon';

export default function HomePage() {
  const today = new Date();
  const formattedDate = format(today, 'EEEE, do MMMM yyyy');
  
  return (
    <div className="w-full h-full pb-16 pt-2 px-4 overflow-y-auto bg-gray-50">
      {/* Map View Section */}
      <div className="relative mb-4">
        {/* Map Container */}
        <div className="relative rounded-xl overflow-hidden h-[300px] bg-blue-100">
          {/* Map Background - using a light blue background as placeholder */}
          <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 relative">
            {/* Map Controls */}
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex flex-col gap-2">
              <button 
                className="w-8 h-8 bg-white shadow-md rounded flex items-center justify-center text-gray-600 hover:bg-gray-50"
                aria-label="Zoom in"
              >
                <PlusIcon />
              </button>
              <button 
                className="w-8 h-8 bg-white shadow-md rounded flex items-center justify-center text-gray-600 hover:bg-gray-50"
                aria-label="Zoom out"
              >
                <span className="text-lg font-light">−</span>
              </button>
            </div>

            {/* Site Marker */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg">
                  <div className="w-6 h-6 text-white">
                    <SiteIcon />
                  </div>
                </div>
              </div>
            </div>

            {/* Team Avatar Cluster */}
            <div className="absolute top-1/3 right-1/3 flex items-center">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white"></div>
                <div className="w-8 h-8 rounded-full bg-green-500 border-2 border-white"></div>
                <div className="w-8 h-8 rounded-full bg-purple-500 border-2 border-white"></div>
                <div className="w-8 h-8 rounded-full bg-gray-800 border-2 border-white flex items-center justify-center">
                  <span className="text-white text-xs font-semibold">+3</span>
                </div>
              </div>
            </div>
          </div>

          {/* Location Card Overlay */}
          <div className="absolute top-4 left-4 right-4">
            <div className="bg-white rounded-xl p-4 shadow-lg">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="w-5 h-5 text-gray-600">
                    <SiteIcon />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">Site A</h3>
                  <div className="flex items-start gap-2">
                    <div className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0">
                      <LocationIcon />
                    </div>
                    <p className="text-sm text-gray-600 leading-tight">
                      3891 Ranchview Dr.<br />
                      Richardson, California 62639
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Team Member Photos */}
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white"></div>
                  <div className="w-8 h-8 rounded-full bg-green-500 border-2 border-white"></div>
                  <div className="w-8 h-8 rounded-full bg-purple-500 border-2 border-white"></div>
                  <div className="w-8 h-8 rounded-full bg-orange-500 border-2 border-white"></div>
                  <div className="w-8 h-8 rounded-full bg-red-500 border-2 border-white"></div>
                  <div className="w-8 h-8 rounded-full bg-gray-800 border-2 border-white flex items-center justify-center">
                    <span className="text-white text-xs font-semibold">+3</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Panel */}
      <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
        <div className="flex items-start gap-2 mb-4">
          <div className="w-5 h-5 text-gray-500 mt-0.5">
            <LocationIcon />
          </div>
          <p className="text-sm text-gray-700">
            3891 Ranchview Dr. Richardson,<br />
            California 62639
          </p>
        </div>

        <div className="space-y-4">
          {/* Check In Time */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 text-primary">
                <ClockIcon />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Check In Time</p>
              <p className="text-xs text-gray-500">09:05</p>
            </div>
          </div>

          {/* Task Progress */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 text-primary">
                <ProgressIcon />
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 mb-1">Task Progress</p>
              <div className="flex items-center gap-2">
                <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full w-[20%]"></div>
                </div>
                <span className="text-xs text-gray-500">20%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <Link href="/hrm" className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-3">
              <div className="w-6 h-6 text-primary">
                <HrmIcon />
              </div>
            </div>
            <span className="text-sm font-semibold text-gray-900">HRM</span>
          </div>
        </Link>

        <Link href="/operations" className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-3">
              <div className="w-6 h-6 text-primary">
                <OperationIcon />
              </div>
            </div>
            <span className="text-sm font-semibold text-gray-900">Operations</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
