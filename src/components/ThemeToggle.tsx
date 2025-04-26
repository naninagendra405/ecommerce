'use client';

import { useTheme } from '@/context/ThemeContext';

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      className="flex items-center justify-center w-10 h-10 rounded-full focus:outline-none bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle Dark Mode"
    >
      {theme === 'dark' ? '🌙' : '☀️'}
    </button>
  );
};
