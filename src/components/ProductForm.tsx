'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCategories } from '@/lib/api';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { Product } from '@/lib/types';

interface ProductFormProps {
  initialData?: Product;
  onSubmit: (data: any) => Promise<boolean>;
  isEditMode?: boolean;
}

export const ProductForm = ({
  initialData,
  onSubmit,
  isEditMode = false,
}: ProductFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    image: '',
    rating: {
      rate: 0,
      count: 0,
    },
  });

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        price: initialData.price.toString(),
        description: initialData.description,
        category: initialData.category,
        image: initialData.image,
        rating: initialData.rating,
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const productData = {
      ...formData,
      price: parseFloat(formData.price),
    };

    try {
      const success = await onSubmit(productData);
      if (!success) {
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Product Title *
            </label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter product title"
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Price *
            </label>
            <Input
              id="price"
              name="price"
              type="number"
              step="0.01"
              min="0"
              value={formData.price}
              onChange={handleChange}
              required
              placeholder="0.00"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Category *
            </label>
            <Select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              {categories?.map((category: string) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Image URL *
            </label>
            <Input
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={7}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
              placeholder="Enter product description"
            ></textarea>
          </div>

          {isEditMode && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="rating" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Rating
                </label>
                <Input
                  id="rating"
                  name="rating.rate"
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={formData.rating.rate}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    setFormData((prev) => ({
                      ...prev,
                      rating: {
                        ...prev.rating,
                        rate: value,
                      },
                    }));
                  }}
                  placeholder="0.0"
                />
              </div>
              <div>
                <label htmlFor="count" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Review Count
                </label>
                <Input
                  id="count"
                  name="rating.count"
                  type="number"
                  min="0"
                  value={formData.rating.count}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    setFormData((prev) => ({
                      ...prev,
                      rating: {
                        ...prev.rating,
                        count: value,
                      },
                    }));
                  }}
                  placeholder="0"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {formData.image && (
        <div className="mt-4 border p-4 rounded-md dark:border-gray-700">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Image Preview
          </label>
          <div className="h-40 flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded">
            <img
              src={formData.image}
              alt="Product preview"
              className="max-h-full max-w-full object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=Image+Error';
              }}
            />
          </div>
        </div>
      )}

      <div className="flex justify-end space-x-3">
        <Button
          type="submit"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          {isEditMode ? 'Update Product' : 'Create Product'}
        </Button>
      </div>
    </form>
  );
};
