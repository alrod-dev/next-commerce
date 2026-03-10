'use client';

import { SessionProvider } from 'next-auth/react';
import CartDrawer from '@/components/layout/CartDrawer';

export default function LayoutProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      {children}
      <CartDrawer />
    </SessionProvider>
  );
}
