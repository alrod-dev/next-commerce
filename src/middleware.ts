import { withAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(req) {
    // This is called for every request that passes auth check
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Protected routes
        if (req.nextUrl.pathname.startsWith('/account')) {
          return !!token;
        }
        if (req.nextUrl.pathname.startsWith('/checkout')) {
          return !!token;
        }
        if (req.nextUrl.pathname.startsWith('/admin')) {
          return token?.role === 'ADMIN';
        }
        return true;
      },
    },
    pages: {
      signIn: '/auth/signin',
    },
  }
);

export const config = {
  matcher: ['/account/:path*', '/checkout/:path*', '/admin/:path*'],
};
