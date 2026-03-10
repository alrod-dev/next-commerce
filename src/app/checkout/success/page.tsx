'use client';

import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useEffect } from 'react';

export default function CheckoutSuccessPage() {
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center px-4">
      <div className="rounded-lg bg-white p-8 shadow-lg max-w-md text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle size={64} className="text-green-500" />
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. We've sent a confirmation email to your inbox.
        </p>

        <div className="bg-slate-50 rounded-lg p-4 mb-6 text-left">
          <p className="text-sm text-gray-600 mb-2">Order Number</p>
          <p className="font-mono font-semibold text-gray-900">#ORD-{Date.now()}</p>
        </div>

        <p className="text-sm text-gray-600 mb-6">
          You'll receive a shipping confirmation with tracking information within 24 hours.
        </p>

        <div className="space-y-3">
          <Link
            href="/account"
            className="block rounded-lg bg-blue-600 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
          >
            View Order
          </Link>
          <Link
            href="/products"
            className="block rounded-lg border border-slate-300 py-3 font-semibold text-gray-900 transition-colors hover:bg-slate-50"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
