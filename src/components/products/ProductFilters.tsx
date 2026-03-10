'use client';

import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface ProductFiltersProps {
  filters: {
    search: string;
    category: string;
    minPrice: string;
    maxPrice: string;
    minRating: string;
    sort: string;
  };
  onChange: (filters: ProductFiltersProps['filters']) => void;
}

const CATEGORIES = [
  { label: 'Electronics', value: 'electronics' },
  { label: 'Fashion', value: 'fashion' },
  { label: 'Home & Garden', value: 'home-garden' },
  { label: 'Sports', value: 'sports' },
  { label: 'Books', value: 'books' },
];

const PRICE_RANGES = [
  { label: 'Under $25', min: 0, max: 25 },
  { label: '$25 to $50', min: 25, max: 50 },
  { label: '$50 to $100', min: 50, max: 100 },
  { label: 'Over $100', min: 100, max: 999999 },
];

const RATINGS = [
  { label: '4+ Stars', value: 4 },
  { label: '3+ Stars', value: 3 },
  { label: '2+ Stars', value: 2 },
];

const SORT_OPTIONS = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Best Rating', value: 'rating' },
  { label: 'Most Popular', value: 'popular' },
];

export default function ProductFilters({ filters, onChange }: ProductFiltersProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    sort: true,
    category: true,
    price: true,
    rating: true,
  });

  const handleFilterChange = (key: string, value: string) => {
    onChange({ ...filters, [key]: value });
  };

  const handlePriceRange = (min: number, max: number) => {
    onChange({
      ...filters,
      minPrice: min.toString(),
      maxPrice: max.toString(),
    });
  };

  const toggleExpanded = (section: string) => {
    setExpanded((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const resetFilters = () => {
    onChange({
      search: '',
      category: '',
      minPrice: '',
      maxPrice: '',
      minRating: '',
      sort: 'newest',
    });
  };

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        <button
          onClick={resetFilters}
          className="text-xs font-semibold text-blue-600 hover:text-blue-700"
        >
          Reset
        </button>
      </div>

      {/* Sort */}
      <div className="border-b border-slate-200 pb-4">
        <button
          onClick={() => toggleExpanded('sort')}
          className="flex w-full items-center justify-between py-2"
        >
          <span className="font-semibold text-gray-900">Sort</span>
          <ChevronDown
            size={18}
            className={`transition-transform ${expanded.sort ? 'rotate-180' : ''}`}
          />
        </button>
        {expanded.sort && (
          <div className="mt-3 space-y-2">
            {SORT_OPTIONS.map((option) => (
              <label key={option.value} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="sort"
                  value={option.value}
                  checked={filters.sort === option.value}
                  onChange={(e) => handleFilterChange('sort', e.target.value)}
                  className="rounded-full"
                />
                <span className="text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Category */}
      <div className="border-b border-slate-200 py-4">
        <button
          onClick={() => toggleExpanded('category')}
          className="flex w-full items-center justify-between"
        >
          <span className="font-semibold text-gray-900">Category</span>
          <ChevronDown
            size={18}
            className={`transition-transform ${expanded.category ? 'rotate-180' : ''}`}
          />
        </button>
        {expanded.category && (
          <div className="mt-3 space-y-2">
            {CATEGORIES.map((category) => (
              <label key={category.value} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.category === category.value}
                  onChange={(e) =>
                    handleFilterChange('category', e.target.checked ? category.value : '')
                  }
                  className="rounded"
                />
                <span className="text-sm text-gray-700">{category.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price */}
      <div className="border-b border-slate-200 py-4">
        <button
          onClick={() => toggleExpanded('price')}
          className="flex w-full items-center justify-between"
        >
          <span className="font-semibold text-gray-900">Price</span>
          <ChevronDown
            size={18}
            className={`transition-transform ${expanded.price ? 'rotate-180' : ''}`}
          />
        </button>
        {expanded.price && (
          <div className="mt-3 space-y-2">
            {PRICE_RANGES.map((range) => (
              <label key={range.label} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="price"
                  checked={
                    filters.minPrice === range.min.toString() &&
                    filters.maxPrice === range.max.toString()
                  }
                  onChange={() => handlePriceRange(range.min, range.max)}
                  className="rounded-full"
                />
                <span className="text-sm text-gray-700">{range.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Rating */}
      <div className="py-4">
        <button
          onClick={() => toggleExpanded('rating')}
          className="flex w-full items-center justify-between"
        >
          <span className="font-semibold text-gray-900">Rating</span>
          <ChevronDown
            size={18}
            className={`transition-transform ${expanded.rating ? 'rotate-180' : ''}`}
          />
        </button>
        {expanded.rating && (
          <div className="mt-3 space-y-2">
            {RATINGS.map((rating) => (
              <label key={rating.value} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="rating"
                  checked={filters.minRating === rating.value.toString()}
                  onChange={(e) =>
                    handleFilterChange('minRating', e.target.checked ? rating.value.toString() : '')
                  }
                  className="rounded-full"
                />
                <span className="text-sm text-gray-700">{rating.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
