'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { getProducts, getCategories } from '@/lib/api';
import { ProductTable } from '@/components/ProductTable';
import { FilterSection } from '@/components/FilterSection';
import { Button } from '@/components/ui/Button';
import { Loader } from '@/components/ui/Loader';
import { Product } from '@/lib/types';

export default function ProductsPage() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    minPrice: 0,
    maxPrice: 1000,
    minRating: 0,
  });
  const itemsPerPage = 8;

  const { data: products, isLoading: isLoadingProducts } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  const filteredProducts = products
    ? products.filter((product: Product) => {
        // Search filter
        if (
          filters.search &&
          !product.title.toLowerCase().includes(filters.search.toLowerCase())
        ) {
          return false;
        }

        // Category filter
        if (filters.category && product.category !== filters.category) {
          return false;
        }

        // Price range filter
        if (product.price < filters.minPrice || product.price > filters.maxPrice) {
          return false;
        }

        // Rating filter
        if (product.rating.rate < filters.minRating) {
          return false;
        }

        return true;
      })
    : [];

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handleFilterChange = (newFilters: any) => {
    setFilters({ ...filters, ...newFilters });
    setPage(1); // Reset to first page when filters change
  };

  if (isLoadingProducts || isLoadingCategories) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Products</h1>
        <Link href="/dashboard/products/add" passHref>
          <Button>Add New Product</Button>
        </Link>
      </div>

      <FilterSection
        categories={categories || []}
        filters={filters}
        onChange={handleFilterChange}
      />

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <ProductTable
          products={paginatedProducts}
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
          showPagination={true}
        />
      </div>
    </div>
  );
}
