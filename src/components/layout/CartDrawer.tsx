'use client';

import { useCartStore } from '@/store/cartStore';
import Link from 'next/link';
import { X, Trash2 } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export default function CartDrawer() {
  const items = useCartStore((state) => state.items);
  const isOpen = useCartStore((state) => state.isOpen);
  const closeCart = useCartStore((state) => state.closeCart);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const getSubtotal = useCartStore((state) => state.getSubtotal());

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 transition-opacity"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-md transform bg-white shadow-xl transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
            <h2 className="text-lg font-semibold">Shopping Cart</h2>
            <button
              onClick={closeCart}
              className="rounded-lg p-1 hover:bg-slate-100"
            >
              <X size={20} />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full">
                <p className="text-gray-600">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => {
                  const price = item.product.salePrice || item.product.price;
                  const subtotal = Number(price) * item.quantity;

                  return (
                    <div
                      key={item.id}
                      className="flex gap-4 border-b border-slate-200 pb-4"
                    >
                      {/* Product Image */}
                      <div className="h-20 w-20 flex-shrink-0 rounded-lg bg-slate-100">
                        <img
                          src={item.product.image || 'https://via.placeholder.com/80'}
                          alt={item.product.name}
                          className="h-full w-full object-cover rounded-lg"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-gray-900">
                          {item.product.name}
                        </h3>
                        <p className="text-sm text-gray-600">{formatCurrency(price)}</p>

                        {/* Quantity Controls */}
                        <div className="mt-2 flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.productId,
                                Math.max(1, item.quantity - 1)
                              )
                            }
                            className="flex h-6 w-6 items-center justify-center rounded border border-slate-300 text-sm"
                          >
                            −
                          </button>
                          <span className="w-6 text-center text-sm">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.productId, item.quantity + 1)
                            }
                            className="flex h-6 w-6 items-center justify-center rounded border border-slate-300 text-sm"
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeItem(item.productId)}
                            className="ml-auto text-red-600 hover:text-red-700"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-slate-200 bg-slate-50 px-6 py-4">
              <div className="mb-4 flex items-center justify-between">
                <span className="font-semibold text-gray-900">Subtotal</span>
                <span className="font-semibold text-gray-900">
                  {formatCurrency(getSubtotal)}
                </span>
              </div>
              <p className="mb-4 text-xs text-gray-600">
                Shipping and taxes calculated at checkout
              </p>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="block w-full rounded-lg bg-blue-600 px-4 py-3 text-center font-semibold text-white transition-colors hover:bg-blue-700"
              >
                Checkout
              </Link>
              <button
                onClick={closeCart}
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-center font-semibold text-gray-900 transition-colors hover:bg-slate-100"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
