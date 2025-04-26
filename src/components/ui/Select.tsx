import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
}

export const Select = ({
  children,
  className = '',
  error,
  ...props
}: SelectProps) => {
  return (
    <div>
      <select
        className={`
          w-full rounded-md shadow-sm 
          px-3 py-2 border border-gray-300 dark:border-gray-700 
          focus:outline-none focus:ring-blue-500 focus:border-blue-500 
          dark:bg-gray-800 dark:text-white 
          ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
          ${className}
        `}
        {...props}
      >
        {children}
      </select>
      
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};
