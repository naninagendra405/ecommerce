'use client';

import { useState, useEffect } from 'react';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { Slider } from './ui/Slider';
import { Checkbox } from './ui/Checkbox';
import { Button } from './ui/Button';

interface FilterSectionProps {
  categories: string[];
  filters: {
    search: string;
    category: string;
    minPrice: number;
    maxPrice: number;
    minRating: number;
  };
  onChange: (filters: any) => void;
}

export const FilterSection = ({
  categories,
  filters,
  onChange,
}: FilterSectionProps) => {
  const [localFilters, setLocalFilters] = useState(filters);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleChange = (name: string, value: any) => {
    setLocalFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePriceChange = (values: [number, number]) => {
    setLocalFilters((prev) => ({
      ...prev,
      minPrice: values[0],
      maxPrice: values[1],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onChange(localFilters);
  };

  const clearFilters = () => {
    const resetFilters = {
      search: '',
      category: '',
      minPrice: 0,
      maxPrice: 1000,
      minRating: 0,
    };
    setLocalFilters(resetFilters);
    onChange(resetFilters);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-wrap items-center justify-between gap-4">
        <div className="flex-1 min-w-[200px]">
          <Input
            placeholder="Search products..."
            value={localFilters.search}
            onChange={(e) => handleChange('search', e.target.value)}
            iconLeft="🔍"
          />
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Hide Filters' : 'Show Filters'}
          </Button>
          <Button
            variant="outline"
            type="button"
            onClick={clearFilters}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            Clear Filters
          </Button>
          <Button onClick={handleSubmit}>Apply Filters</Button>
        </div>
      </div>

      {isExpanded && (
        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category
            </label>
            <Select
              value={localFilters.category}
              onChange={(e) => handleChange('category', e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Price Range: ${localFilters.minPrice} - ${localFilters.maxPrice}
            </label>
            <Slider
              min={0}
              max={1000}
              step={10}
              values={[localFilters.minPrice, localFilters.maxPrice]}
              onChange={handlePriceChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Minimum Rating
            </label>
            <div className="flex items-center space-x-4">
              {[1, 2, 3, 4, 5].map((rating) => (
                <div key={rating} className="flex items-center">
                  <Checkbox
                    id={`rating-${rating}`}
                    checked={localFilters.minRating <= rating}
                    onChange={() => handleChange('minRating', rating)}
                  />
                  <label
                    htmlFor={`rating-${rating}`}
                    className="ml-2 text-gray-700 dark:text-gray-300 flex items-center"
                  >
                    {rating}+ <span className="ml-1 text-yellow-500">⭐</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
