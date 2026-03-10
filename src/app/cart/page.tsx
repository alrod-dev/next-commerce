'use client';

import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { Trash2, ArrowLeft } from 'lucide-react';
import { formatCurrency, calculateTax, calculateShipping } from '@/lib/utils';

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const subtotal = items.reduce((acc, item) => {
    const price = item.product.salePrice || item.product.price;
    return acc + Number(price) * item.quantity;
  }, 0);

  const tax = calculateTax(subtotal);
  const shipping = calculateShipping(subtotal);
  const total = subtotal + tax + shipping;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/products" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft size={20} />
            Continue Shopping
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
        </div>

        {items.length === 0 ? (
          <div className="rounded-lg bg-white p-12 text-center">
            <p className="text-gray-600 mb-4">Your cart is empty</p>
            <Link
              href="/products"
              className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="rounded-lg bg-white">
                {items.map((item, index) => {
                  const price = item.product.salePrice || item.product.price;
                  const itemTotal = Number(price) * item.quantity;

                  return (
                    <div
                      key={item.id}
                      className={`flex gap-6 p-6 ${index !== items.length - 1 ? 'border-b border-slate-200' : ''}`}
                    >
                      {/* Product Image */}
                      <div className="h-24 w-24 flex-shrink-0 rounded-lg bg-slate-100">
                        <img
                          src={item.product.image || 'https://via.placeholder.com/100'}
                          alt={item.product.name}
                          className="h-full w-full object-cover rounded-lg"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <Link
                          href={`/products/${item.product.slug}`}
                          className="font-semibold text-gray-900 hover:text-blue-600"
                        >
                          {item.product.name}
                        </Link>
                        <p className="mt-1 text-sm text-gray-600">SKU: {item.product.sku}</p>
                        <p className="mt-2 font-semibold text-gray-900">
                          {formatCurrency(price)}
                        </p>

                        {/* Quantity Controls */}
                        <div className="mt-4 flex items-center gap-3">
                          <div className="flex items-center border border-slate-300 rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                              className="px-3 py-1 text-gray-600 hover:text-gray-900"
                            >
                              −
                            </button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() =>
                                updateQuantity(item.productId, item.quantity + 1)
                              }
                              className="px-3 py-1 text-gray-600 hover:text-gray-900"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.productId)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>

                      {/* Item Total */}
                      <div className="flex-shrink-0 text-right">
                        <p className="text-lg font-semibold text-gray-900">
                          {formatCurrency(itemTotal)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Order Summary */}
            <div className="rounded-lg bg-white p-6 h-fit">
              <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>

              <div className="mt-6 space-y-4 border-b border-slate-200 pb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{formatCurrency(shipping)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>{formatCurrency(tax)}</span>
                </div>
              </div>

              <div className="mt-4 flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>

              <Link
                href="/checkout"
                className="mt-6 block w-full rounded-lg bg-blue-600 py-3 text-center font-semibold text-white transition-colors hover:bg-blue-700"
              >
                Proceed to Checkout
              </Link>

              <button className="mt-3 w-full rounded-lg border border-slate-300 py-3 font-semibold text-gray-900 transition-colors hover:bg-slate-50">
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
