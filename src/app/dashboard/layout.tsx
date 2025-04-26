'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { Loader } from '@/components/ui/Loader';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="relative">
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 opacity-30 blur-md"></div>
          <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 flex flex-col items-center">
            <Loader size="lg" />
            <p className="mt-4 text-gray-600 dark:text-gray-300 text-sm font-medium">
              Loading your dashboard...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Sidebar with glassmorphism effect */}
      <Sidebar />
      
      {/* Main content area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        
        {/* Main content with subtle gradient background */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-6 lg:p-8">
          {/* Page wrapper with max width for better readability on large screens */}
          <div className="w-full max-w-screen-2xl mx-auto">
            {/* Animated fade-in effect */}
            <div className="animate-fadeIn">
              {children}
            </div>
          </div>
        </main>
        
        {/* Footer */}
        <footer className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 text-center text-xs text-gray-500 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} E-Commerce Dashboard. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
