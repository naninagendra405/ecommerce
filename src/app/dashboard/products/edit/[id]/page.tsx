'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getProductById } from '@/lib/api';
import { ProductForm } from '@/components/ProductForm';
import { Button } from '@/components/ui/Button';
import { Loader } from '@/components/ui/Loader';

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;

  const { data: product, isLoading, isError } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProductById(Number(productId)),
  });

  const handleSubmit = async (productData: any) => {
    // In a real app, we would send the data to an API
    // For now, we'll just simulate a successful update
    setTimeout(() => {
      router.push(`/dashboard/products/${productId}`);
    }, 500);
    
    return true;
  };

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
          The product you're trying to edit doesn't exist or has been removed.
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
          Edit Product
        </h1>
        <div className="flex gap-2">
          <Link href={`/dashboard/products/${productId}`} passHref>
            <Button variant="outline">Cancel</Button>
          </Link>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <ProductForm
          initialData={product}
          onSubmit={handleSubmit}
          isEditMode={true}
        />
      </div>
    </div>
  );
}
