import React from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: string | React.ReactNode;
  color: 'blue' | 'green' | 'yellow' | 'purple' | 'red' | 'cyan' | 'indigo' | 'pink';
  trend?: {
    value: number;
    label?: string;
    isUpward: boolean;
  };
  onClick?: () => void;
}

// Background and text color variations based on the card color
const colorClasses = {
  blue: {
    card: 'from-blue-500/5 to-blue-500/10 dark:from-blue-500/10 dark:to-blue-600/20',
    border: 'border-blue-200 dark:border-blue-800',
    icon: 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md shadow-blue-500/20',
    text: 'text-blue-600 dark:text-blue-400',
    trend: {
      up: 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300',
      down: 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-300',
    }
  },
  green: {
    card: 'from-green-500/5 to-green-500/10 dark:from-green-500/10 dark:to-green-600/20',
    border: 'border-green-200 dark:border-green-800',
    icon: 'bg-gradient-to-br from-green-500 to-green-600 text-white shadow-md shadow-green-500/20',
    text: 'text-green-600 dark:text-green-400',
    trend: {
      up: 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-300',
      down: 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-300',
    }
  },
  yellow: {
    card: 'from-yellow-500/5 to-yellow-500/10 dark:from-yellow-500/10 dark:to-yellow-600/20',
    border: 'border-yellow-200 dark:border-yellow-800',
    icon: 'bg-gradient-to-br from-yellow-500 to-yellow-600 text-white shadow-md shadow-yellow-500/20',
    text: 'text-yellow-600 dark:text-yellow-400',
    trend: {
      up: 'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-300',
      down: 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-300',
    }
  },
  purple: {
    card: 'from-purple-500/5 to-purple-500/10 dark:from-purple-500/10 dark:to-purple-600/20',
    border: 'border-purple-200 dark:border-purple-800',
    icon: 'bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-md shadow-purple-500/20',
    text: 'text-purple-600 dark:text-purple-400',
    trend: {
      up: 'bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-300',
      down: 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-300',
    }
  },
  red: {
    card: 'from-red-500/5 to-red-500/10 dark:from-red-500/10 dark:to-red-600/20',
    border: 'border-red-200 dark:border-red-800',
    icon: 'bg-gradient-to-br from-red-500 to-red-600 text-white shadow-md shadow-red-500/20',
    text: 'text-red-600 dark:text-red-400',
    trend: {
      up: 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-300',
      down: 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-300',
    }
  },
  cyan: {
    card: 'from-cyan-500/5 to-cyan-500/10 dark:from-cyan-500/10 dark:to-cyan-600/20',
    border: 'border-cyan-200 dark:border-cyan-800',
    icon: 'bg-gradient-to-br from-cyan-500 to-cyan-600 text-white shadow-md shadow-cyan-500/20',
    text: 'text-cyan-600 dark:text-cyan-400',
    trend: {
      up: 'bg-cyan-50 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-300',
      down: 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-300',
    }
  },
  indigo: {
    card: 'from-indigo-500/5 to-indigo-500/10 dark:from-indigo-500/10 dark:to-indigo-600/20',
    border: 'border-indigo-200 dark:border-indigo-800',
    icon: 'bg-gradient-to-br from-indigo-500 to-indigo-600 text-white shadow-md shadow-indigo-500/20',
    text: 'text-indigo-600 dark:text-indigo-400',
    trend: {
      up: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300',
      down: 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-300',
    }
  },
  pink: {
    card: 'from-pink-500/5 to-pink-500/10 dark:from-pink-500/10 dark:to-pink-600/20',
    border: 'border-pink-200 dark:border-pink-800',
    icon: 'bg-gradient-to-br from-pink-500 to-pink-600 text-white shadow-md shadow-pink-500/20',
    text: 'text-pink-600 dark:text-pink-400',
    trend: {
      up: 'bg-pink-50 text-pink-600 dark:bg-pink-900/30 dark:text-pink-300',
      down: 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-300',
    }
  }
};

// SVG icons for different metric types
const getSvgIcon = (color: keyof typeof colorClasses, iconName = 'default') => {
  const icons = {
    products: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    categories: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
      </svg>
    ),
    price: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    rating: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
    orders: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
    customers: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    default: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  };

  return icons[iconName as keyof typeof icons] || icons.default;
};

export const StatsCard = ({ 
  title, 
  value, 
  subtitle, 
  icon, 
  color, 
  trend,
  onClick
}: StatsCardProps) => {
  const iconType = typeof title === 'string' 
    ? title.toLowerCase().includes('product') ? 'products'
      : title.toLowerCase().includes('categor') ? 'categories'
      : title.toLowerCase().includes('price') ? 'price'
      : title.toLowerCase().includes('rat') ? 'rating'
      : title.toLowerCase().includes('order') ? 'orders'
      : title.toLowerCase().includes('customer') ? 'customers'
      : 'default'
    : 'default';

  // Determine if the card should be clickable
  const isClickable = !!onClick;
  
  return (
    <div 
      className={`
        relative bg-gradient-to-br ${colorClasses[color].card} border ${colorClasses[color].border} 
        rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md
        ${isClickable ? 'cursor-pointer hover:translate-y-[-2px]' : ''}
      `}
      onClick={onClick}
    >
      {/* Top accent border with gradient */}
      <div className={`h-1 w-full bg-gradient-to-r from-${color}-500 to-${color}-600`}></div>
      
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{title}</p>
            <p className={`text-2xl font-bold ${colorClasses[color].text} mb-1`}>
              {value}
            </p>
            {subtitle && (
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-[180px]">
                {subtitle}
              </p>
            )}
            
            {/* Trend indicator */}
            {trend && (
              <div className="mt-2 flex items-center">
                <span 
                  className={`
                    inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium
                    ${trend.isUpward ? colorClasses[color].trend.up : colorClasses[color].trend.down}
                  `}
                >
                  {trend.isUpward ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" />
                    </svg>
                  )}
                  {trend.value}%
                </span>
                {trend.label && (
                  <span className="ml-1.5 text-xs text-gray-500 dark:text-gray-400">
                    {trend.label}
                  </span>
                )}
              </div>
            )}
          </div>
          
          <div className={`p-3 rounded-lg ${colorClasses[color].icon}`}>
            {typeof icon === 'string' ? (
              <span className="text-xl">{icon}</span>
            ) : icon ? (
              icon
            ) : (
              getSvgIcon(color, iconType)
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
