'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ProductForm } from '@/components/ProductForm';
import { Button } from '@/components/ui/Button';

export default function AddProductPage() {
  const router = useRouter();

  const handleSubmit = async (productData: any) => {
    // In a real app, we would send the data to an API
    // For now, we'll just simulate a successful creation
    setTimeout(() => {
      router.push('/dashboard/products');
    }, 500);
    
    return true;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Add New Product
        </h1>
        <Link href="/dashboard/products" passHref>
          <Button variant="outline">Cancel</Button>
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <ProductForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
