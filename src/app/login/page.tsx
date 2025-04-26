'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (err) {
      setError('Invalid email or password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 px-4">
      {/* Logo or Brand Icon */}
      <div className="w-20 h-20 mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      </div>
      
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden transform transition-all hover:scale-[1.01]">
        <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
        <div className="px-8 pt-8 pb-6">
          <h2 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            E-Commerce Admin
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Manage your store with powerful tools
          </p>
        </div>
        
        <div className="px-8 pb-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  iconLeft="mail"
                  className="w-full"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Password
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  iconLeft="lock"
                  className="w-full"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-3 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            )}

            <div>
              <Button
                type="submit"
                variant="primary"
                fullWidth
                isLoading={isLoading}
                className="w-full py-2.5 text-base font-medium"
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </Button>
            </div>

            <div className="text-sm text-center pt-2">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <span className="w-10 h-px bg-gray-300 dark:bg-gray-700"></span>
                <span className="text-gray-500 dark:text-gray-400 text-xs uppercase">Demo Access</span>
                <span className="w-10 h-px bg-gray-300 dark:bg-gray-700"></span>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md border border-blue-100 dark:border-blue-800">
                <p className="text-blue-700 dark:text-blue-300 font-medium mb-1">Demo Credentials</p>
                <p className="text-gray-600 dark:text-gray-400 text-xs">
                  Email: <span className="font-mono bg-white dark:bg-gray-700 px-1 py-0.5 rounded">admin@example.com</span>
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-xs">
                  Password: <span className="font-mono bg-white dark:bg-gray-700 px-1 py-0.5 rounded">admin123</span>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
      
      <div className="mt-8 text-center text-xs text-gray-500 dark:text-gray-400">
        <p>© {new Date().getFullYear()} E-Commerce Dashboard | All rights reserved</p>
        <div className="mt-2">
          <Link href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Privacy Policy</Link>
          <span className="mx-2">•</span>
          <Link href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Terms of Service</Link>
        </div>
      </div>
    </div>
  );
}
