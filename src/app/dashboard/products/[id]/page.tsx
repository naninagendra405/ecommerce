'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getProductById } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Loader } from '@/components/ui/Loader';
import { Badge } from '@/components/ui/Badge';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;

  const { data: product, isLoading, isError } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProductById(Number(productId)),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader size="lg" />
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
        <h2 className="text-2xl font-bold text-red-500">Product not found</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          The product you're looking for doesn't exist or has been removed.
        </p>
        <Button
          onClick={() => router.push('/dashboard/products')}
          className="mt-4"
        >
          Back to Products
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Product Details
        </h1>
        <div className="flex gap-2">
          <Link href={`/dashboard/products/edit/${productId}`} passHref>
            <Button variant="secondary">Edit Product</Button>
          </Link>
          <Link href="/dashboard/products" passHref>
            <Button variant="outline">Back to Products</Button>
          </Link>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 flex justify-center bg-gray-50 dark:bg-gray-900">
            <div className="relative w-full h-80 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.title}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </div>
          <div className="p-6 md:col-span-2">
            <div className="mb-6">
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge color="blue">{product.category}</Badge>
                <Badge color="green">
                  {product.rating.rate} ⭐ ({product.rating.count} reviews)
                </Badge>
                <Badge color="yellow">
                  {Math.random() > 0.5 ? 'In Stock' : 'Low Stock'}
                </Badge>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {product.title}
              </h2>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                ${product.price.toFixed(2)}
              </div>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300">{product.description}</p>
              </div>
            </div>

            <div className="space-y-4 border-t pt-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Product ID
                  </h3>
                  <p className="text-gray-900 dark:text-white">{product.id}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Category
                  </h3>
                  <p className="text-gray-900 dark:text-white capitalize">
                    {product.category}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Rating
                  </h3>
                  <p className="text-gray-900 dark:text-white">
                    {product.rating.rate} / 5 ({product.rating.count} reviews)
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Stock Status
                  </h3>
                  <p className="text-gray-900 dark:text-white">
                    {Math.random() > 0.5 ? 'In Stock' : 'Low Stock'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
