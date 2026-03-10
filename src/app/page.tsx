import { Suspense } from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import ProductGrid from '@/components/products/ProductGrid';
import { ArrowRight, Zap, Shield, Truck } from 'lucide-react';

async function FeaturedProducts() {
  const products = await prisma.product.findMany({
    where: { featured: true, published: true },
    take: 8,
    include: { category: true },
  });

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="group relative overflow-hidden rounded-lg bg-white p-4 shadow-card transition-all hover:shadow-card-lg"
        >
          <div className="aspect-square overflow-hidden rounded bg-gray-200">
            <img
              src={product.image || 'https://via.placeholder.com/400'}
              alt={product.name}
              className="h-full w-full object-cover transition-transform group-hover:scale-110"
            />
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
              {product.name}
            </h3>
            <p className="mt-1 text-xs text-gray-500">{product.category?.name}</p>
            <div className="mt-2 flex items-center justify-between">
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-bold text-gray-900">
                  ${(product.salePrice || product.price).toFixed(2)}
                </span>
                {product.salePrice && (
                  <span className="text-xs text-gray-500 line-through">
                    ${product.price.toFixed(2)}
                  </span>
                )}
              </div>
              <div className="text-xs text-yellow-500">★ {product.rating}</div>
            </div>
            <Link
              href={`/products/${product.slug}`}
              className="mt-4 inline-block w-full rounded-lg bg-blue-600 py-2 text-center text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            >
              View
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

async function Categories() {
  const categories = await prisma.category.findMany({
    take: 6,
  });

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/products?category=${category.slug}`}
          className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-white shadow-card transition-all hover:shadow-card-lg"
        >
          <div className="relative z-10">
            <h3 className="font-semibold">{category.name}</h3>
            <div className="mt-2 inline-flex items-center gap-1 text-sm opacity-0 transition-opacity group-hover:opacity-100">
              Shop <ArrowRight size={16} />
            </div>
          </div>
          <div className="absolute right-0 top-0 text-blue-400 opacity-20 transition-transform group-hover:scale-110">
            <div className="text-6xl font-bold">→</div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Premium Products,{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Unbeatable Prices
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
              Discover our curated collection of high-quality products. Fast shipping, secure
              checkout, and 100% satisfaction guaranteed.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
              >
                Shop Now <ArrowRight className="ml-2" size={20} />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-lg border border-slate-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-slate-800"
              >
                View Catalog
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="border-b border-slate-200 bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                <Zap size={24} className="text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Fast Shipping</h3>
              <p className="mt-2 text-sm text-gray-600">Get your orders in 2-3 business days</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                <Shield size={24} className="text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Secure Checkout</h3>
              <p className="mt-2 text-sm text-gray-600">SSL encrypted payments with Stripe</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                <Truck size={24} className="text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Easy Returns</h3>
              <p className="mt-2 text-sm text-gray-600">30-day money-back guarantee</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-gray-900">Shop by Category</h2>
          <p className="mt-2 text-gray-600">Browse our collection by category</p>
          <div className="mt-8">
            <Suspense fallback={<div className="h-32 bg-slate-200 rounded-lg" />}>
              <Categories />
            </Suspense>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="border-t border-slate-200 bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
          <p className="mt-2 text-gray-600">Our handpicked selection of premium items</p>
          <div className="mt-8">
            <Suspense fallback={<div className="h-64 bg-slate-200 rounded-lg" />}>
              <FeaturedProducts />
            </Suspense>
          </div>
        </div>
      </section>
    </div>
  );
}
