'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ProductGallery from '@/components/products/ProductGallery';
import ReviewForm from '@/components/products/ReviewForm';
import ReviewList from '@/components/products/ReviewList';
import { useCartStore } from '@/store/cartStore';
import { Star, Truck, Shield } from 'lucide-react';
import type { Product, Review } from '@/types';

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // This would be fixed with proper slug-based endpoint
        const res = await fetch(`/api/products`);
        const { data } = await res.json();
        const foundProduct = data.find((p: Product) => p.slug === slug);
        setProduct(foundProduct);

        if (foundProduct) {
          const reviewRes = await fetch(`/api/reviews?productId=${foundProduct.id}`);
          const { data: reviewData } = await reviewRes.json();
          setReviews(reviewData);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
      setQuantity(1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="animate-pulse">
            <div className="aspect-square rounded-lg bg-slate-200" />
            <div className="mt-8 h-8 w-2/3 rounded bg-slate-200" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-gray-600">Product not found</p>
        </div>
      </div>
    );
  }

  const discount = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Product Image Gallery */}
          <ProductGallery images={[product.image, ...product.images]} />

          {/* Product Details */}
          <div>
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              <div className="mt-4 flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={
                        i < Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.ratingCount} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="mb-6 border-b border-gray-200 pb-6">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-gray-900">
                  ${product.salePrice ? product.salePrice.toFixed(2) : product.price.toFixed(2)}
                </span>
                {product.salePrice && (
                  <>
                    <span className="text-lg text-gray-500 line-through">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="text-sm font-semibold text-red-600">
                      Save {discount}%
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="mb-6 border-b border-gray-200 pb-6">
              <h3 className="font-semibold text-gray-900">Description</h3>
              <p className="mt-2 text-gray-600">{product.description}</p>
            </div>

            {/* Stock Status */}
            <div className="mb-6 border-b border-gray-200 pb-6">
              {product.stock > 0 ? (
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <div className="h-2 w-2 rounded-full bg-green-600" />
                  In Stock ({product.stock} available)
                </div>
              ) : (
                <div className="flex items-center gap-2 text-sm text-red-600">
                  <div className="h-2 w-2 rounded-full bg-red-600" />
                  Out of Stock
                </div>
              )}
            </div>

            {/* Add to Cart */}
            <div className="mb-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-gray-600 hover:text-gray-900"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min="1"
                    max={product.stock}
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="w-16 border-none bg-white py-2 text-center"
                  />
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-4 py-2 text-gray-600 hover:text-gray-900"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex-1 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 disabled:bg-gray-400"
                >
                  Add to Cart
                </button>
              </div>
            </div>

            {/* Benefits */}
            <div className="space-y-3 border-t border-gray-200 pt-6">
              <div className="flex items-center gap-3">
                <Truck size={20} className="text-gray-600" />
                <span className="text-sm text-gray-600">Free shipping on orders over $100</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield size={20} className="text-gray-600" />
                <span className="text-sm text-gray-600">Secure checkout with Stripe</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16 border-t border-gray-200 pt-12">
          <h2 className="text-2xl font-bold text-gray-900">Reviews</h2>
          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <ReviewList productId={product.id} initialReviews={reviews} />
            </div>
            <div>
              <ReviewForm productId={product.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
