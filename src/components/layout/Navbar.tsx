'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useCartStore } from '@/store/cartStore';
import { ShoppingCart, Menu, X, Search, User, LogOut } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const cartCount = useCartStore((state) => state.getItemCount());
  const openCart = useCartStore((state) => state.openCart);

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="h-8 w-8 rounded-lg bg-blue-600" />
            <span className="hidden sm:inline">next-commerce</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/products"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              Products
            </Link>
            <Link
              href="/products?sort=newest"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              New
            </Link>
            <Link
              href="/products?sort=popular"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              Popular
            </Link>
          </div>

          {/* Right side items */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="hidden lg:flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
              <Search size={18} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-32 border-none bg-transparent text-sm placeholder-gray-400 outline-none"
              />
            </div>

            {/* Account */}
            {session?.user ? (
              <div className="relative group">
                <button className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900">
                  <User size={20} />
                </button>
                <div className="absolute right-0 mt-0 w-48 bg-white border border-slate-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link
                    href="/account"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-50"
                  >
                    My Account
                  </Link>
                  {session.user.email === 'admin@example.com' && (
                    <Link
                      href="/admin"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-50"
                    >
                      Admin
                    </Link>
                  )}
                  <button
                    onClick={() => signOut()}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <Link
                href="/auth/signin"
                className="text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Sign In
              </Link>
            )}

            {/* Cart */}
            <button
              onClick={() => openCart()}
              className="relative flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 h-5 w-5 rounded-full bg-red-500 text-white flex items-center justify-center text-xs font-semibold">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="border-t border-slate-200 bg-slate-50 py-4 md:hidden">
            <Link href="/products" className="block px-4 py-2 text-sm font-medium text-gray-900">
              Products
            </Link>
            <Link href="/account" className="block px-4 py-2 text-sm font-medium text-gray-900">
              Account
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
