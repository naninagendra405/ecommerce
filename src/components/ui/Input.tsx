import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  iconLeft?: string;
  iconRight?: string;
  error?: string;
}

export const Input = ({ 
  className = '', 
  iconLeft, 
  iconRight, 
  error, 
  ...props 
}: InputProps) => {
  return (
    <div className="relative">
      {iconLeft && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-gray-500 dark:text-gray-400 text-sm">
            {iconLeft}
          </span>
        </div>
      )}
      
      <input
        className={`
          w-full rounded-md shadow-sm 
          ${iconLeft ? 'pl-10' : 'pl-3'} 
          ${iconRight ? 'pr-10' : 'pr-3'} 
          py-2 border border-gray-300 dark:border-gray-700 
          focus:outline-none focus:ring-blue-500 focus:border-blue-500 
          dark:bg-gray-800 dark:text-white 
          ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
          ${className}
        `}
        {...props}
      />
      
      {iconRight && (
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <span className="text-gray-500 dark:text-gray-400 text-sm">
            {iconRight}
          </span>
        </div>
      )}
      
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};
