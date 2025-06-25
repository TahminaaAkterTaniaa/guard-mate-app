'use client'

import Image from 'next/image';

export default function ProfilePage() {
  return (
    <div className="bg-white rounded-lg p-4">
      <h1 className="text-xl font-bold text-blue-900 mb-6">Profile</h1>
      
      {/* User Profile Card */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full overflow-hidden">
              <Image 
                src="/images/avatar-placeholder.png" 
                alt="Profile"
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>
            <button 
              aria-label="Edit profile picture" 
              title="Edit profile picture"
              className="absolute bottom-0 right-0 bg-blue-700 text-white p-1 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </button>
          </div>
          <h2 className="text-xl font-bold">John Smith</h2>
          <p className="text-gray-500">Security Guard</p>
          <p className="text-sm text-blue-700 mt-1">ID: G-10045</p>
        </div>
        
        <div className="mt-6">
          <div className="flex justify-between border-b py-3">
            <span className="text-gray-500">Email</span>
            <span className="font-medium">john@guardmate.com</span>
          </div>
          <div className="flex justify-between border-b py-3">
            <span className="text-gray-500">Phone</span>
            <span className="font-medium">(123) 456-7890</span>
          </div>
          <div className="flex justify-between border-b py-3">
            <span className="text-gray-500">Date of Birth</span>
            <span className="font-medium">May 15, 1985</span>
          </div>
          <div className="flex justify-between py-3">
            <span className="text-gray-500">Address</span>
            <span className="font-medium text-right">123 Security Ave, Suite 101<br />Guardville, CA 90210</span>
          </div>
        </div>
      </div>
      
      {/* Professional Info */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Professional Information</h3>
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-500">Position</span>
            <span className="font-medium">Senior Security Guard</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Department</span>
            <span className="font-medium">Commercial Security</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Join Date</span>
            <span className="font-medium">January 10, 2020</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">License</span>
            <span className="font-medium">SG-12345-CA</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">License Expiry</span>
            <span className="font-medium">December 31, 2025</span>
          </div>
        </div>
      </div>
      
      {/* Emergency Contact */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Emergency Contact</h3>
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-500">Name</span>
            <span className="font-medium">Jane Smith</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Relationship</span>
            <span className="font-medium">Spouse</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Phone</span>
            <span className="font-medium">(123) 456-7891</span>
          </div>
        </div>
      </div>
    </div>
  );
}
