import React from 'react';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  error?: string;
}

export const Checkbox = ({ id, className = '', error, ...props }: CheckboxProps) => {
  return (
    <div className="relative flex items-start">
      <div className="flex items-center h-5">
        <input
          id={id}
          type="checkbox"
          className={`
            h-4 w-4 rounded border-gray-300 dark:border-gray-700 
            text-blue-600 focus:ring-blue-500 
            dark:bg-gray-800 dark:checked:bg-blue-600
            ${error ? 'border-red-500' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};
