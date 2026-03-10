'use client';

import Link from 'next/link';
import { BarChart3, Package, ShoppingCart } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

        <div className="grid gap-6 sm:grid-cols-3">
          {/* Products Card */}
          <Link
            href="/admin/products"
            className="rounded-lg bg-white p-6 shadow-card hover:shadow-card-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Products</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">Manage</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <Package size={24} className="text-blue-600" />
              </div>
            </div>
          </Link>

          {/* Orders Card */}
          <Link
            href="/admin/orders"
            className="rounded-lg bg-white p-6 shadow-card hover:shadow-card-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Orders</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">Manage</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center">
                <ShoppingCart size={24} className="text-green-600" />
              </div>
            </div>
          </Link>

          {/* Analytics Card */}
          <div className="rounded-lg bg-white p-6 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Analytics</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">Coming Soon</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center">
                <BarChart3 size={24} className="text-purple-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
