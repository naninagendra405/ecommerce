'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProducts, getCategories } from '@/lib/api';
import { StatsCard } from '@/components/StatsCard';
import { Loader } from '@/components/ui/Loader';
import { ProductTable } from '@/components/ProductTable';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const { data: products, isLoading: isLoadingProducts } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    avgPrice: 0,
    highestRated: { title: '', rating: 0 },
    totalOrders: 0,
    totalCustomers: 0,
    revenue: 0,
  });

  const [periodComparison] = useState({
    products: { value: 12, isUpward: true },
    categories: { value: 0, isUpward: true },
    price: { value: 5, isUpward: false },
    rating: { value: 8, isUpward: true },
  });

  useEffect(() => {
    if (products && products.length > 0) {
      const avgPrice = parseFloat(
        (products.reduce((sum, product) => sum + product.price, 0) / products.length).toFixed(2)
      );
      
      const highestRated = products.reduce((prev, current) => {
        return prev.rating.rate > current.rating.rate ? prev : current;
      });

      // For demo purposes, calculate mock revenue from products
      const mockRevenue = products.reduce((sum, product) => {
        return sum + (product.price * product.rating.count);
      }, 0);

      setStats({
        totalProducts: products.length,
        totalCategories: categories?.length || 0,
        avgPrice,
        highestRated: {
          title: highestRated.title,
          rating: highestRated.rating.rate,
        },
        // Mock data for demo purposes
        totalOrders: 137,
        totalCustomers: 42,
        revenue: mockRevenue,
      });
    }
  }, [products, categories]);

  // Navigate to product list on card click
  const navigateToProducts = () => {
    router.push('/dashboard/products');
  };

  if (isLoadingProducts || isLoadingCategories) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <Loader size="lg" />
          <p className="mt-4 text-gray-500 dark:text-gray-400 animate-pulse">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Welcome section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Welcome back to your store overview</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/dashboard/products/add">
            <Button 
              variant="primary"
              leftIcon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              }
            >
              Add Product
            </Button>
          </Link>
          <Button 
            variant="outline"
            leftIcon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            }
          >
            Export Data
          </Button>
        </div>
      </div>

      {/* Time period filter (non-functional in demo) */}
      <div className="flex justify-end">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-1 inline-flex">
          <button className="px-3 py-1.5 text-sm font-medium rounded-md bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300">
            Today
          </button>
          <button className="px-3 py-1.5 text-sm font-medium rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
            Week
          </button>
          <button className="px-3 py-1.5 text-sm font-medium rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
            Month
          </button>
          <button className="px-3 py-1.5 text-sm font-medium rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
            Year
          </button>
        </div>
      </div>
      
      {/* Stats overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatsCard
          title="Products"
          value={stats.totalProducts}
          onClick={navigateToProducts}
          color="blue"
          trend={{
            value: periodComparison.products.value,
            isUpward: periodComparison.products.isUpward,
            label: "vs. last period"
          }}
        />
        <StatsCard
          title="Categories"
          value={stats.totalCategories}
          color="green"
          trend={{
            value: periodComparison.categories.value,
            isUpward: periodComparison.categories.isUpward,
            label: "vs. last period"
          }}
        />
        <StatsCard
          title="Avg. Price"
          value={formatPrice(stats.avgPrice)}
          color="indigo"
          trend={{
            value: periodComparison.price.value,
            isUpward: periodComparison.price.isUpward,
            label: "vs. last period"
          }}
        />
        <StatsCard
          title="Total Revenue"
          value={formatPrice(stats.revenue)}
          color="purple"
          trend={{
            value: 15,
            isUpward: true,
            label: "vs. last period"
          }}
        />
      </div>

      {/* Second row of stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <StatsCard
          title="Orders"
          value={stats.totalOrders}
          color="yellow"
          trend={{
            value: 24,
            isUpward: true,
            label: "vs. last period"
          }}
        />
        <StatsCard
          title="Customers"
          value={stats.totalCustomers}
          color="cyan"
          trend={{
            value: 17,
            isUpward: true,
            label: "vs. last period"
          }}
        />
        <StatsCard
          title="Highest Rated"
          value={`${stats.highestRated.rating.toFixed(1)}★`}
          subtitle={stats.highestRated.title}
          color="pink"
          trend={{
            value: periodComparison.rating.value,
            isUpward: periodComparison.rating.isUpward,
            label: "vs. last period"
          }}
        />
      </div>

      {/* Recent products table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-card border border-gray-200 dark:border-gray-700 overflow-hidden transition-all hover:shadow-card-hover">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Recent Products
          </h2>
          <Link href="/dashboard/products">
            <Button variant="ghost" size="sm">
              View All
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </Link>
        </div>
        {products && (
          <ProductTable
            products={products.slice(0, 5)}
            showPagination={false}
            showFilters={false}
          />
        )}
      </div>
      
      {/* Additional info section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick actions card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-card border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Link href="/dashboard/products/add" className="flex items-center p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800/30 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add New Product
            </Link>
            <button className="flex items-center w-full p-3 bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              View Notifications
            </button>
            <button className="flex items-center w-full p-3 bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              View Analytics
            </button>
          </div>
        </div>
        
        {/* Top categories */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-card border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top Categories</h3>
          {categories && categories.length > 0 ? (
            <div className="space-y-4">
              {categories.slice(0, 4).map((category, index) => (
                <div key={category} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full ${
                      index === 0 ? 'bg-blue-500' : 
                      index === 1 ? 'bg-green-500' : 
                      index === 2 ? 'bg-yellow-500' : 
                      'bg-purple-500'
                    } mr-3`}></div>
                    <span className="text-gray-700 dark:text-gray-300 capitalize">{category}</span>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{Math.floor(Math.random() * 100)}%</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No categories available</p>
          )}
        </div>
        
        {/* System status */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-card border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">System Status</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">API Status</span>
                <span className="text-sm font-medium text-green-600 dark:text-green-400">Operational</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Database</span>
                <span className="text-sm font-medium text-green-600 dark:text-green-400">Operational</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Storage</span>
                <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">75% Used</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
