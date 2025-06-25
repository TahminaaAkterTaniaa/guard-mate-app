'use client'

import Link from 'next/link';

export default function HRMPage() {
  return (
    <div className="bg-white rounded-lg p-4">
      <h1 className="text-xl font-bold text-blue-900 mb-6">HRM</h1>
      
      <div className="grid grid-cols-2 gap-4">
        {/* Attendance */}
        <Link href="/hrm/attendance" className="flex flex-col items-center bg-white shadow-sm rounded-lg p-4 border border-gray-100">
          <div className="mb-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 2V5" stroke="#293991" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 2V5" stroke="#293991" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3.5 9.09H20.5" stroke="#293991" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke="#293991" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M11.9955 13.7H12.0045" stroke="#293991" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8.29431 13.7H8.30329" stroke="#293991" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8.29431 16.7H8.30329" stroke="#293991" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="text-sm font-semibold text-blue-900">Attendance</span>
        </Link>

        {/* e-Leave */}
        <Link href="/hrm/leave" className="flex flex-col items-center bg-white shadow-sm rounded-lg p-4 border border-gray-100">
          <div className="mb-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 2V5" stroke="#293991" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 2V5" stroke="#293991" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3.5 9.09H20.5" stroke="#293991" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke="#293991" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M15.6947 13.7H15.7037" stroke="#293991" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M15.6947 16.7H15.7037" stroke="#293991" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="text-sm font-semibold text-blue-900">e-Leave</span>
        </Link>

        {/* Payslip */}
        <Link href="/hrm/payslip" className="flex flex-col items-center bg-white shadow-sm rounded-lg p-4 border border-gray-100">
          <div className="mb-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 6V8.42C22 10 21 11 19.42 11H16V4.01C16 2.9 16.91 2 18.02 2C19.11 2.01 20.11 2.45 20.83 3.17C21.55 3.9 22 4.9 22 6Z" stroke="#293991" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 7V21C2 21.83 2.94 22.3 3.6 21.8L5.31 20.52C5.71 20.22 6.27 20.26 6.63 20.62L8.29 22.29C8.68 22.68 9.32 22.68 9.71 22.29L11.39 20.61C11.74 20.26 12.3 20.22 12.69 20.52L14.4 21.8C15.06 22.29 16 21.82 16 21V4C16 2.9 16.9 2 18 2H7H6C3 2 2 3.79 2 6V7Z" stroke="#293991" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 13.01H12" stroke="#293991" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 9.01H12" stroke="#293991" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5.99609 13H6.00508" stroke="#293991" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5.99609 9H6.00508" stroke="#293991" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="text-sm font-semibold text-blue-900">Payslip</span>
        </Link>

        {/* Claims */}
        <Link href="/hrm/claims" className="flex flex-col items-center bg-white shadow-sm rounded-lg p-4 border border-gray-100">
          <div className="mb-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 14.5C13.3807 14.5 14.5 13.3807 14.5 12C14.5 10.6193 13.3807 9.5 12 9.5C10.6193 9.5 9.5 10.6193 9.5 12C9.5 13.3807 10.6193 14.5 12 14.5Z" stroke="#293991" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M18.5 9.5V14.5" stroke="#293991" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 18C9 18.75 8.79001 19.46 8.42001 20.06C7.73001 21.22 6.46 22 5 22C3.54 22 2.26999 21.22 1.57999 20.06C1.20999 19.46 1 18.75 1 18C1 15.79 2.79 14 5 14C7.21 14 9 15.79 9 18Z" stroke="#293991" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3.44141 17.9995L4.43141 18.9895L6.56141 17.0195" stroke="#293991" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 15.3V9C2 5.5 4 4 7 4H17C20 4 22 5.5 22 9V15C22 18.5 20 20 17 20H8.5" stroke="#293991" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="text-sm font-semibold text-blue-900">Claims</span>
        </Link>

        {/* Documents */}
        <Link href="/hrm/documents" className="flex flex-col items-center bg-white shadow-sm rounded-lg p-4 border border-gray-100">
          <div className="mb-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14" stroke="#293991" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 10H18C15 10 14 9 14 6V2L22 10Z" stroke="#293991" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7 13H13" stroke="#293991" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7 17H11" stroke="#293991" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="text-sm font-semibold text-blue-900">Documents</span>
        </Link>

        {/* Announcement */}
        <Link href="/hrm/announcement" className="flex flex-col items-center bg-white shadow-sm rounded-lg p-4 border border-gray-100">
          <div className="mb-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.0693 5.93005L8.98929 5.92005C7.80929 5.91005 6.70928 5.60005 5.93928 4.83005C5.23928 4.13005 4.86929 3.19005 4.86929 2.08005C4.85929 1.52005 5.05928 0.980049 5.42928 0.610049C5.78928 0.250049 6.27929 0.0500488 6.80929 0.0500488C7.34929 0.0500488 7.86929 0.260049 8.24929 0.630049C8.62929 1.00005 8.83929 1.51005 8.83929 2.05005L8.85929 4.09005L19.1393 4.11005C19.9293 4.11005 20.5793 3.46005 20.5793 2.67005C20.5793 1.88005 19.9293 1.23005 19.1393 1.23005H17.2693C16.8593 1.23005 16.5293 0.900049 16.5293 0.490049C16.5293 0.080049 16.8593 -0.249951 17.2693 -0.249951H19.1393C20.7193 -0.249951 21.9993 1.03005 21.9993 2.61005C21.9993 4.19005 20.7193 5.47005 19.1393 5.47005L19.0693 5.93005Z" fill="#293991"/>
              <path d="M11.5594 18.33H1.4294C0.629395 18.33 -0.000605066 17.7 -0.000605066 16.9V9.10001C-0.000605066 8.30001 0.629395 7.67001 1.4294 7.67001H11.5594C12.3594 7.67001 12.9894 8.30001 12.9894 9.10001V16.9C12.9894 17.7 12.3594 18.33 11.5594 18.33Z" fill="#293991"/>
              <path d="M19.48 16.22H17.3C16.89 16.22 16.56 15.89 16.56 15.48C16.56 15.07 16.89 14.74 17.3 14.74H19.48C20.31 14.74 20.99 14.06 20.99 13.23C20.99 12.4 20.31 11.72 19.48 11.72H17.36C16.95 11.72 16.62 11.39 16.62 10.98C16.62 10.57 16.95 10.24 17.36 10.24H19.48C21.13 10.24 22.47 11.58 22.47 13.23C22.47 14.88 21.13 16.22 19.48 16.22Z" fill="#293991"/>
              <path d="M16.37 14H9.76001C9.35001 14 9.02001 13.67 9.02001 13.26C9.02001 12.85 9.35001 12.52 9.76001 12.52H16.37C16.78 12.52 17.11 12.85 17.11 13.26C17.11 13.67 16.78 14 16.37 14Z" fill="#293991"/>
              <path d="M15.5793 24C14.3093 24 13.2793 23.13 13.0693 21.88L12.5593 18.84C12.4993 18.44 12.7593 18.05 13.1593 17.98C13.5693 17.92 13.9493 18.18 14.0193 18.58L14.5293 21.62C14.6193 22.22 15.1393 22.64 15.7493 22.57C16.3493 22.5 16.7893 22 16.7893 21.39V18.34C16.7893 17.93 17.1193 17.6 17.5293 17.6C17.9393 17.6 18.2693 17.93 18.2693 18.34V21.39C18.2693 22.61 17.3593 23.66 16.1493 23.88C15.9593 23.97 15.7693 24 15.5793 24Z" fill="#293991"/>
              <path d="M7.93 7.67001H5.06C3.93 7.67001 3.01 6.75001 3.01 5.62001V4.08001C3 3.69001 3.31 3.35001 3.71 3.34001C4.12 3.32001 4.45 3.63001 4.46 4.04001L4.47 5.58001C4.47 5.97001 4.77 6.24001 5.12 6.20001C5.45 6.16001 5.68 5.87001 5.68 5.53001V2.07001C5.68 1.66001 6.01 1.33001 6.42 1.33001C6.83 1.33001 7.16 1.66001 7.16 2.07001V5.04001C7.16 5.38001 7.39 5.67001 7.72 5.71001C8.07 5.75001 8.37 5.48001 8.37 5.09001V2.79001C8.37 2.38001 8.7 2.05001 9.11 2.05001C9.52 2.05001 9.85 2.38001 9.85 2.79001V5.35001C9.85 5.86001 10.27 6.28001 10.78 6.28001C11.29 6.28001 11.71 5.86001 11.71 5.35001V4.64001C11.71 4.23001 12.04 3.90001 12.45 3.90001C12.86 3.90001 13.19 4.23001 13.19 4.64001V5.62001C13.19 6.75001 12.27 7.67001 11.14 7.67001H7.93Z" fill="#293991"/>
            </svg>
          </div>
          <span className="text-sm font-semibold text-blue-900">Announcement</span>
        </Link>
      </div>
    </div>
  );
}
