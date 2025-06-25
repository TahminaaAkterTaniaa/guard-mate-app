'use client'

import { signOut } from 'next-auth/react';
import Image from 'next/image';

export default function SettingsPage() {
  return (
    <div className="bg-white rounded-lg p-4">
      <h1 className="text-xl font-bold text-blue-900 mb-6">Settings</h1>
      
      {/* Settings List */}
      <div className="divide-y">
        {/* Account Settings */}
        <div className="py-3">
          <h2 className="text-sm font-medium text-gray-500 mb-2">ACCOUNT</h2>
          
          <div className="bg-white rounded-lg">
            <a href="#" className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="#293991" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M20.5899 22C20.5899 18.13 16.7399 15 11.9999 15C7.25991 15 3.40991 18.13 3.40991 22" stroke="#293991" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="font-medium">Personal Information</span>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </a>
            
            <a href="#" className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#293991" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12.28 15.39C12.12 15.39 11.97 15.39 11.82 15.39C10.83 15.36 9.85 14.91 9.1 14.16C8.35 13.41 7.9 12.43 7.87 11.44C7.87 9.43 9.5 7.78 11.53 7.78C12.55 7.78 13.5 8.18 14.21 8.88C14.91 9.59 15.32 10.55 15.29 11.56C15.26 13.56 13.66 15.18 12.28 15.39Z" stroke="#293991" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16.06 19.39C15.06 18.88 13.98 18.57 12.86 18.48C11.15 18.33 9.44 18.68 7.87 19.39" stroke="#293991" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="font-medium">Update Profile</span>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </a>
            
            <a href="#" className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.4232 5.56202C20.0452 9.18402 20.0452 14.8152 16.4232 18.4372C12.8012 22.0592 7.17018 22.0592 3.54818 18.4372C-0.0738221 14.8152 -0.0738221 9.18402 3.54818 5.56202C7.17018 1.94002 12.8012 1.94002 16.4232 5.56202Z" stroke="#293991" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M19.74 20.7499L17.74 18.7499" stroke="#293991" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="font-medium">Change Password</span>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
        
        {/* App Settings */}
        <div className="py-3">
          <h2 className="text-sm font-medium text-gray-500 mb-2">APP SETTINGS</h2>
          
          <div className="bg-white rounded-lg">
            <a href="#" className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#293991" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 12.88V11.12C2 10.08 2.85 9.22 3.9 9.22C5.71 9.22 6.45 7.94 5.54 6.37C5.02 5.47 5.33 4.3 6.24 3.78L7.97 2.79C8.76 2.32 9.78 2.6 10.25 3.39L10.36 3.58C11.26 5.15 12.74 5.15 13.65 3.58L13.76 3.39C14.23 2.6 15.25 2.32 16.04 2.79L17.77 3.78C18.68 4.3 18.99 5.47 18.47 6.37C17.56 7.94 18.3 9.22 20.11 9.22C21.15 9.22 22.01 10.07 22.01 11.12V12.88C22.01 13.92 21.16 14.78 20.11 14.78C18.3 14.78 17.56 16.06 18.47 17.63C18.99 18.54 18.68 19.7 17.77 20.22L16.04 21.21C15.25 21.68 14.23 21.4 13.76 20.61L13.65 20.42C12.75 18.85 11.27 18.85 10.36 20.42L10.25 20.61C9.78 21.4 8.76 21.68 7.97 21.21L6.24 20.22C5.33 19.7 5.02 18.53 5.54 17.63C6.45 16.06 5.71 14.78 3.9 14.78C2.85 14.78 2 13.92 2 12.88Z" stroke="#293991" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="font-medium">Preferences</span>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </a>
            
            <a href="#" className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.0001 22.7499C17.1087 22.7499 21.2501 18.6085 21.2501 13.4999C21.2501 8.39127 17.1087 4.24988 12.0001 4.24988C6.89152 4.24988 2.75013 8.39127 2.75013 13.4999C2.75013 18.6085 6.89152 22.7499 12.0001 22.7499Z" stroke="#293991" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 13.5V10.5" stroke="#293991" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12.0004 1.25C13.8204 1.25 15.3004 2.73 15.3004 4.55C15.3004 6.37 13.8204 7.85 12.0004 7.85C10.1804 7.85 8.70039 6.37 8.70039 4.55C8.70039 2.73 10.1804 1.25 12.0004 1.25Z" stroke="#293991" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 16.5H12.01" stroke="#293991" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="font-medium">Help & Support</span>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </a>
            
            <a href="#" className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 10V8C6 4.69 7 2 12 2C17 2 18 4.69 18 8V10" stroke="#293991" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M17 22H7C3 22 2 21 2 17V15C2 11 3 10 7 10H17C21 10 22 11 22 15V17C22 21 21 22 17 22Z" stroke="#293991" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M15.9965 16H16.0054" stroke="#293991" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M11.9955 16H12.0045" stroke="#293991" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7.99451 16H8.00349" stroke="#293991" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="font-medium">Privacy & Security</span>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
        
        {/* Logout Button */}
        <div className="pt-6">
          <button 
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="w-full flex items-center justify-center gap-2 py-3 bg-red-50 text-red-600 rounded-lg font-medium"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.90002 7.55999C9.21002 3.95999 11.06 2.48999 15.11 2.48999H15.24C19.71 2.48999 21.5 4.27999 21.5 8.74999V15.27C21.5 19.74 19.71 21.53 15.24 21.53H15.11C11.09 21.53 9.24002 20.08 8.91002 16.54" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M15 12H3.62" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5.85 8.6499L2.5 11.9999L5.85 15.3499" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Logout
          </button>
        </div>
        
        {/* App Version */}
        <div className="pt-8 text-center">
          <p className="text-xs text-gray-400">GuardMate v1.0.0</p>
          <p className="text-xs text-gray-400 mt-1">© 2023 GuardMate. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
