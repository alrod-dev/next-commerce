'use client';

import { useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { LogOut } from 'lucide-react';
import { formatDate, formatCurrency } from '@/lib/utils';
import type { Order } from '@/types';

export default function AccountPage() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('/api/orders');
        if (res.ok) {
          const data = await res.json();
          setOrders(data);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.id) {
      fetchOrders();
    }
  }, [session?.user?.id]);

  if (!session) {
    return (
      <div className="min-h-screen bg-white px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-gray-600 mb-4">Please sign in to view your account</p>
          <Link
            href="/auth/signin"
            className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
            <p className="mt-2 text-gray-600">Manage your profile and orders</p>
          </div>
          <button
            onClick={() => signOut()}
            className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-red-700"
          >
            <LogOut size={20} />
            Sign Out
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Profile Card */}
          <div className="rounded-lg bg-white p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-semibold text-gray-900">{session.user?.name || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-semibold text-gray-900">{session.user?.email}</p>
              </div>
              <Link
                href="/account/settings"
                className="inline-block text-blue-600 hover:text-blue-700 font-semibold text-sm mt-4"
              >
                Edit Profile →
              </Link>
            </div>
          </div>

          {/* Orders List */}
          <div className="lg:col-span-2">
            <div className="rounded-lg bg-white p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Order History</h2>

              {loading ? (
                <p className="text-gray-600">Loading orders...</p>
              ) : orders.length === 0 ? (
                <p className="text-gray-600">No orders yet</p>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between border-b border-slate-200 pb-4 last:border-0"
                    >
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{order.orderNumber}</p>
                        <p className="text-sm text-gray-600">
                          {formatDate(order.createdAt)}
                        </p>
                        <div className="mt-1 flex gap-2">
                          <span className={`inline-block rounded px-2 py-1 text-xs font-semibold ${
                            order.status === 'DELIVERED'
                              ? 'bg-green-100 text-green-700'
                              : order.status === 'CANCELLED'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}>
                            {order.status}
                          </span>
                          <span className={`inline-block rounded px-2 py-1 text-xs font-semibold ${
                            order.paymentStatus === 'PAID'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {order.paymentStatus}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">
                          {formatCurrency(order.total)}
                        </p>
                        <p className="text-sm text-gray-600">
                          {order.items.length} items
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
