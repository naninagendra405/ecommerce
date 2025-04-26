'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProducts, getCategories } from '@/lib/api';
import { StatsCard } from '@/components/StatsCard';
import { Loader } from '@/components/ui/Loader';
import { ProductTable } from '@/components/ProductTable';

export default function DashboardPage() {
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
  });

  useEffect(() => {
    if (products && products.length > 0) {
      const avgPrice = parseFloat(
        (products.reduce((sum, product) => sum + product.price, 0) / products.length).toFixed(2)
      );
      
      const highestRated = products.reduce((prev, current) => {
        return prev.rating.rate > current.rating.rate ? prev : current;
      });

      setStats({
        totalProducts: products.length,
        totalCategories: categories?.length || 0,
        avgPrice,
        highestRated: {
          title: highestRated.title,
          rating: highestRated.rating.rate,
        },
      });
    }
  }, [products, categories]);

  if (isLoadingProducts || isLoadingCategories) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Products"
          value={stats.totalProducts}
          icon="📦"
          color="blue"
        />
        <StatsCard
          title="Categories"
          value={stats.totalCategories}
          icon="🏷️"
          color="green"
        />
        <StatsCard
          title="Average Price"
          value={`$${stats.avgPrice}`}
          icon="💰"
          color="yellow"
        />
        <StatsCard
          title="Highest Rated"
          value={`${stats.highestRated.rating}⭐`}
          subtitle={stats.highestRated.title}
          icon="🏆"
          color="purple"
        />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Recent Products</h2>
        {products && (
          <ProductTable
            products={products.slice(0, 5)}
            showPagination={false}
            showFilters={false}
          />
        )}
      </div>
    </div>
  );
}
