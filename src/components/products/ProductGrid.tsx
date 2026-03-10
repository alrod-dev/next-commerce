'use client';

import Link from 'next/link';
import { Star } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import type { Product } from '@/types';

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product, 1);
  };

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => {
        const discount = product.salePrice
          ? Math.round(((product.price - product.salePrice) / product.price) * 100)
          : 0;

        return (
          <Link
            key={product.id}
            href={`/products/${product.slug}`}
            className="group relative overflow-hidden rounded-lg bg-white shadow-card transition-all hover:shadow-card-lg"
          >
            <div className="relative aspect-square overflow-hidden bg-slate-100">
              <img
                src={product.image || 'https://via.placeholder.com/400'}
                alt={product.name}
                className="h-full w-full object-cover transition-transform group-hover:scale-110"
              />
              {discount > 0 && (
                <div className="absolute right-3 top-3 rounded-lg bg-red-500 px-2 py-1 text-sm font-semibold text-white">
                  -{discount}%
                </div>
              )}
              {product.stock === 0 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <span className="text-sm font-semibold text-white">Out of Stock</span>
                </div>
              )}
            </div>

            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600">
                {product.name}
              </h3>

              {/* Category */}
              {product.category && (
                <p className="mt-1 text-xs text-gray-500">{product.category.name}</p>
              )}

              {/* Rating */}
              <div className="mt-2 flex items-center gap-1">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={
                        i < Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-600">({product.ratingCount})</span>
              </div>

              {/* Price */}
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-lg font-bold text-gray-900">
                  ${(product.salePrice || product.price).toFixed(2)}
                </span>
                {product.salePrice && (
                  <span className="text-xs text-gray-500 line-through">
                    ${product.price.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={(e) => handleAddToCart(product, e)}
                disabled={product.stock === 0}
                className="mt-4 w-full rounded-lg bg-blue-600 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Add to Cart
              </button>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
