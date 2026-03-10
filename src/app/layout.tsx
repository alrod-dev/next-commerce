import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import LayoutProviders from '@/components/layout/LayoutProviders';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'next-commerce | Modern E-Commerce Platform',
  description: 'A full-stack e-commerce platform built with Next.js 14 and Stripe',
  keywords: 'ecommerce, nextjs, stripe, shopping, products',
  authors: [{ name: 'Alfredo Wiesner', url: 'https://alrod.dev' }],
  creator: 'Alfredo Wiesner',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://next-commerce.vercel.app',
    siteName: 'next-commerce',
    images: [
      {
        url: 'https://next-commerce.vercel.app/og.png',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-screen flex-col bg-slate-50">
        <LayoutProviders>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </LayoutProviders>
      </body>
    </html>
  );
}
