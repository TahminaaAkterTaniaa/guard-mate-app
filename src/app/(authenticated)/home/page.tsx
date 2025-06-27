'use client'

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

// Import required icon components
import LocationIcon from '../../../../public/icons/mapPineLineIcon';
import SiteIcon from '../../../../public/icons/siteIcon';
import HrmIcon from '../../../../public/icons/hrmIcon';
import OperationIcon from '../../../../public/icons/operationIcon';
import CheckInIcon from '../../../../public/icons/checkInIcon';
import ProgressIcon from '../../../../public/icons/progressIcon';

// Team member data for the modal
const teamMembers = [
  { id: 1, name: 'John Doe', avatar: '/public/images/avatar-placeholder.png' },
  { id: 2, name: 'Jonah Johnson', avatar: '/public/images/profile1.jpeg' },
  { id: 3, name: 'Christopher Young', avatar: '/public/images/profile2.jpg' },
  { id: 4, name: 'Daniel Adams', avatar: '/public/images/profile2.jpg' },
  { id: 5, name: 'Ethan Thompson', avatar: '/public/images/profile1.jpeg' },
  { id: 6, name: 'Ethan Thompson', avatar: '/public/images/profile1.jpeg' },
  { id: 7, name: 'Ethan Thompson', avatar: '/public/images/profile2.jpg' },
  { id: 8, name: 'Ethan Thompson', avatar: '/public/images/profile1.jpeg' },
];

// Toast Notification Component
function ToastNotification({ type, message, onClose }: { type: 'reminder' | 'info', message: string, onClose: () => void }) {
  // Use local state to manage visibility
  const [visible, setVisible] = useState(true);

  // Handle close with animation
  const handleClose = () => {
    setVisible(false);
    // Call the parent onClose after animation would complete
    setTimeout(onClose, 300);
  };

  // Early return if not visible
  if (!visible) return null;
  
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md overflow-hidden">
        <div className="flex items-start p-4">
          <div className="flex-shrink-0 mr-3">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
              <span className="text-white text-xl font-bold">!</span>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-gray-900 font-medium">
              {type === 'reminder' ? 'Check-Out Reminder' : 'Info'}
            </h3>
            <p className="text-gray-600 mt-1">{message}</p>
          </div>
          <button 
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-500 ml-2 cursor-pointer p-1"
            aria-label="Close notification"
            title="Close"
            type="button"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  // Note: Date formatting is now handled in TopProfileHeader component
  const [showModal, setShowModal] = useState(false);
  const [showCheckoutReminder, setShowCheckoutReminder] = useState(false);
  const [showInfoNotification, setShowInfoNotification] = useState(false);
  
  // Track if notifications were manually dismissed
  const [reminderDismissed, setReminderDismissed] = useState(false);
  const [infoDismissed, setInfoDismissed] = useState(false);
  
  // For testing purposes, let's show both notifications with buttons to toggle them
  const [testMode, setTestMode] = useState(true);
  
  // Set checkout time to 5:40 PM for testing
  const now = new Date();
  const checkoutTimeObj = new Date(now);
  checkoutTimeObj.setHours(18, 31, 0, 0); // 5:40 PM
  
 
  const checkoutHour = checkoutTimeObj.getHours();
  const checkoutMinute = checkoutTimeObj.getMinutes();
  const ampm = checkoutHour >= 12 ? 'PM' : 'AM';
  const displayHour = checkoutHour % 12 || 12;
  const checkoutTime = `${displayHour}:${checkoutMinute.toString().padStart(2, '0')} ${ampm}`;
  
  // For testing - show info notification immediately if we're past checkout time
  const [initialCheckDone, setInitialCheckDone] = useState(false);
  
  // Handle closing notifications
  const handleCloseCheckoutReminder = () => setShowCheckoutReminder(false);
  const handleCloseInfoNotification = () => setShowInfoNotification(false);
  
  useEffect(() => {
    if (!testMode) {
      // Use the calculated checkout time (2 minutes from now)
      const now = new Date();
      const checkoutTime = new Date(now.getTime() + 2 * 60000);
      const checkoutHour = checkoutTime.getHours();
      const checkoutMinute = checkoutTime.getMinutes();
      
      const checkTime = () => {
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        
        // Calculate time difference in minutes
        const currentTotalMinutes = currentHour * 60 + currentMinute;
        const checkoutTotalMinutes = checkoutHour * 60 + checkoutMinute;
        const minutesDifference = checkoutTotalMinutes - currentTotalMinutes;
        
        // Show checkout reminder 10 minutes before checkout time
        if (minutesDifference <= 10 && minutesDifference > 0) {
          setShowCheckoutReminder(true);
          setShowInfoNotification(false);
        }
        // Show info notification after checkout time
        else if (minutesDifference < 0) {
          setShowCheckoutReminder(false);
          setShowInfoNotification(true);
        }
        else {
          setShowCheckoutReminder(false);
          setShowInfoNotification(false);
        }
      };
      
      // Check immediately and then every minute
      checkTime();
      const interval = setInterval(checkTime, 60000); // Check every minute
      
      return () => clearInterval(interval);
    }
  }, [testMode]);
  
  // Check notification timing based on checkout time
  useEffect(() => {
    if (testMode) {
      const checkTime = () => {
        const now = new Date();
        const timeUntilCheckout = checkoutTimeObj.getTime() - now.getTime();
        const minutesUntilCheckout = Math.floor(timeUntilCheckout / (1000 * 60));
        
        // Show checkout reminder only 10 minutes before checkout time
        if (minutesUntilCheckout <= 10 && minutesUntilCheckout > 0) {
          // Only show if not manually dismissed
          if (!reminderDismissed) {
            setShowCheckoutReminder(true);
          }
          setShowInfoNotification(false);
          
          // Reset info dismissed state when we're back in reminder territory
          setInfoDismissed(false);
        } 
        // Show info notification after checkout time
        else if (minutesUntilCheckout <= 0) {
          setShowCheckoutReminder(false);
          
          // Only show if not manually dismissed
          if (!infoDismissed) {
            setShowInfoNotification(true);
          }
          
          // Reset reminder dismissed state when we're past checkout
          setReminderDismissed(false);
        } 
        // Hide both notifications if more than 10 minutes before checkout
        else {
          setShowCheckoutReminder(false);
          setShowInfoNotification(false);
          
          // Reset dismissed states when outside notification periods
          setReminderDismissed(false);
          setInfoDismissed(false);
        }
      };
      
      checkTime();
      const interval = setInterval(checkTime, 1000); // Check every second
      
      return () => clearInterval(interval);
    }
  }, [testMode, checkoutTimeObj, reminderDismissed, infoDismissed]);
  
  return (
    <div className="w-full h-full bg-gray-50 px-4">
      {/* Check-Out Reminder Toast */}
      {showCheckoutReminder && (
        <ToastNotification 
          key={`checkout-reminder-${new Date().getTime()}`}
          type="reminder" 
          message={`It's check-out time! Please ensure you've completed your check-out before ${checkoutTime}.`}
          onClose={() => {
            setShowCheckoutReminder(false);
            setReminderDismissed(true);
          }}
        />
      )}
      
      {/* Info Notification Toast */}
      {showInfoNotification && (
        <ToastNotification 
          key={`info-notification-${new Date().getTime()}`}
          type="info" 
          message="An email has been sent to the supervisor as the check-out wasn't completed on time. Thank you for your understanding."
          onClose={() => {
            setShowInfoNotification(false);
            setInfoDismissed(true);
          }}
        />
      )}
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
              <div className="flex -space-x-2 cursor-pointer" onClick={() => setShowModal(true)}>
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
            <HrmIcon active={false} />
          </div>
          <span className="text-sm font-medium text-primary">HRM</span>
        </Link>

        <Link href="/operations" className="bg-white rounded-xl p-4 shadow-sm flex flex-col items-center justify-center h-24">
          <div className="text-primary mb-2">
            <OperationIcon active={false} />
          </div>
          <span className="text-sm font-medium text-primary">Operations</span>
        </Link>
      </div>
      
      {/* Team Members Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50" 
            onClick={() => setShowModal(false)}
          ></div>
          
          {/* Modal Content */}
          <div className="relative bg-white w-full max-w-md rounded-xl shadow-lg overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h2 className="text-lg font-medium text-gray-900">Site A Assigned Members</h2>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-500"
                aria-label="Close modal"
                title="Close"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Modal Body - Team Members List */}
            <div className="p-4 max-h-[70vh] overflow-y-auto">
              <div className="space-y-4">
                {teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                      {/* Use default avatar fallback if image fails to load */}
                      <Image 
                        src={member.avatar} 
                        alt={member.name}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // @ts-expect-error - Setting src on error
                          e.currentTarget.src = '/images/avatars/default-avatar.png';
                        }}
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{member.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
