import { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/lib/types';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { Pagination } from './Pagination';

interface ProductTableProps {
  products: Product[];
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  showPagination?: boolean;
  showFilters?: boolean;
}

export const ProductTable = ({
  products,
  currentPage = 1,
  totalPages = 1,
  onPageChange = () => {},
  showPagination = true,
  showFilters = true,
}: ProductTableProps) => {
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);

  const handleDelete = (id: number) => {
    // In a real app, this would call an API to delete the product
    console.log(`Deleting product ${id}`);
    setSelectedProduct(null);
  };

  if (products.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 text-center">
        <p className="text-gray-500 dark:text-gray-400">No products found.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Product
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell"
              >
                Category
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Price
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell"
              >
                Rating
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell"
              >
                Stock
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img
                        className="h-10 w-10 object-contain"
                        src={product.image}
                        alt={product.title}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">
                        {product.title}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 hidden sm:block">
                        ID: {product.id}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                  <Badge color="blue">{product.category}</Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    ${product.price.toFixed(2)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-900 dark:text-white mr-1">
                      {product.rating.rate}
                    </span>
                    <span className="text-yellow-500">⭐</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                      ({product.rating.count})
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                  <Badge color={Math.random() > 0.3 ? 'green' : 'yellow'}>
                    {Math.random() > 0.3 ? 'In Stock' : 'Low Stock'}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <Link href={`/dashboard/products/${product.id}`} passHref>
                      <Button size="sm" variant="ghost">
                        View
                      </Button>
                    </Link>
                    <Link href={`/dashboard/products/edit/${product.id}`} passHref>
                      <Button size="sm" variant="ghost">
                        Edit
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950"
                      onClick={() => setSelectedProduct(product.id)}
                    >
                      Delete
                    </Button>
                  </div>
                  
                  {selectedProduct === product.id && (
                    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                          Confirm Deletion
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6">
                          Are you sure you want to delete "{product.title}"? This action cannot be undone.
                        </p>
                        <div className="flex justify-end space-x-3">
                          <Button
                            variant="outline"
                            onClick={() => setSelectedProduct(null)}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => handleDelete(product.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPagination && totalPages > 1 && (
        <div className="py-4 px-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
};
