import Link from 'next/link';
import { Product } from '@/lib/types';
import { Badge } from './ui/Badge';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link href={`/dashboard/products/${product.id}`}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow overflow-hidden h-full flex flex-col">
        <div className="p-4 bg-gray-50 dark:bg-gray-900 h-48 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-full max-w-full object-contain"
          />
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <Badge color="blue">{product.category}</Badge>
              <div className="flex items-center text-yellow-500">
                <span>{product.rating.rate}</span>
                <span className="ml-1">⭐</span>
              </div>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1 line-clamp-2">
              {product.title}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-2">
              {product.description}
            </p>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
              ${product.price.toFixed(2)}
            </span>
            <Badge color={Math.random() > 0.3 ? 'green' : 'yellow'}>
              {Math.random() > 0.3 ? 'In Stock' : 'Low Stock'}
            </Badge>
          </div>
        </div>
      </div>
    </Link>
  );
};
