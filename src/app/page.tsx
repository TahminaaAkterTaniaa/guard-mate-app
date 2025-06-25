'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getSession } from 'next-auth/react';
import colors from '@/constants/colors';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const checkAuthStatus = async () => {
      const session = await getSession();
      
      if (session) {
        // User is authenticated, redirect to dashboard
        router.push('/home');
      } else {
        // User is not authenticated, redirect to login
        router.push('/login');
      }
    };
    
    checkAuthStatus();
  }, [router]);

  // Render a loading state while checking authentication
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-bg">
      <div className="p-6 rounded-lg shadow-md bg-white">
        <h1 className="text-2xl font-semibold mb-4 text-font">
          GuardMate
        </h1>
        <p className="text-center text-mediumGray">
          Redirecting to the appropriate page...
        </p>
      </div>
    </div>
  );
}
