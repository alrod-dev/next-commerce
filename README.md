# next-commerce

A modern, full-stack e-commerce platform built with Next.js 14, TypeScript, and Stripe. Built by [Alfredo Wiesner](https://alrod.dev), Senior Engineer with 8+ years of experience.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js 14](https://img.shields.io/badge/Next.js-14.0-blue.svg)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![Stripe](https://img.shields.io/badge/Stripe-Integrated-blue.svg)](https://stripe.com/)

## Features

### Core Features
- **Product Catalog** - Browse products with advanced filtering, search, and sorting
- **Shopping Cart** - Add/remove items, modify quantities with optimistic updates
- **Checkout** - Secure checkout flow with address validation
- **Payment Processing** - Stripe integration with webhook handling
- **User Authentication** - NextAuth with email/password and Google OAuth
- **Order Management** - Track orders and view order history
- **Product Reviews** - Leave and view ratings and reviews
- **Admin Dashboard** - Manage products and orders

### Technical Features
- **Server Components** - React 18 Server Components for optimal performance
- **Streaming** - Progressive page loads with Suspense boundaries
- **TypeScript** - Full type safety across the application
- **Prisma ORM** - Type-safe database access with migrations
- **Zod Validation** - Runtime type checking for forms and APIs
- **Zustand State** - Lightweight cart state management
- **Tailwind CSS** - Responsive utility-first styling
- **API Routes** - RESTful API with authentication
- **Middleware** - Edge middleware for auth protection
- **Image Optimization** - Next.js Image component with lazy loading
- **SEO** - Meta tags and structured data

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         Web Browser                              │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ HTTP/HTTPS
                             │
    ┌────────────────────────▼────────────────────────────┐
    │         Next.js 14 App (frontend + backend)         │
    │                                                      │
    │  ┌──────────────────────────────────────────────┐  │
    │  │         App Router & Server Components       │  │
    │  ├──────────────────────────────────────────────┤  │
    │  │  Pages: /, /products, /checkout, /account   │  │
    │  │  Components: ProductGrid, Cart, Navbar      │  │
    │  │  Suspense: Streaming & Progressive Loading  │  │
    │  └──────────────────────────────────────────────┘  │
    │                     │                               │
    │  ┌──────────────────▼──────────────────────────┐  │
    │  │         API Routes (Backend)                │  │
    │  ├──────────────────────────────────────────────┤  │
    │  │ POST   /api/auth/[...nextauth]              │  │
    │  │ GET    /api/products                        │  │
    │  │ GET    /api/products/[id]                   │  │
    │  │ GET    /api/cart                            │  │
    │  │ POST   /api/cart                            │  │
    │  │ PUT    /api/cart                            │  │
    │  │ DELETE /api/cart                            │  │
    │  │ POST   /api/checkout                        │  │
    │  │ POST   /api/reviews                         │  │
    │  │ GET    /api/reviews                         │  │
    │  │ POST   /api/admin/products                  │  │
    │  │ GET    /api/admin/orders                    │  │
    │  │ POST   /api/webhooks/stripe                 │  │
    │  └──────────────────────────────────────────────┘  │
    │                     │                               │
    │  ┌──────────────────▼──────────────────────────┐  │
    │  │  Middleware & Auth                          │  │
    │  ├──────────────────────────────────────────────┤  │
    │  │ NextAuth: Credentials, Google OAuth         │  │
    │  │ Protected Routes: /account, /checkout       │  │
    │  │ Admin Routes: /admin/*                      │  │
    │  └──────────────────────────────────────────────┘  │
    └────────────────────────┬────────────────────────────┘
                             │
          ┌──────────────────┼──────────────────┐
          │                  │                  │
          ▼                  ▼                  ▼
    ┌──────────────┐   ┌──────────────┐   ┌──────────────┐
    │ PostgreSQL   │   │ Stripe       │   │ Session      │
    │ Database     │   │ Payment API  │   │ Store        │
    │              │   │              │   │              │
    │ - Products   │   │ - Checkout   │   │ - Cart State │
    │ - Orders     │   │ - Webhooks   │   │              │
    │ - Users      │   │              │   │              │
    │ - Reviews    │   │              │   │              │
    └──────────────┘   └──────────────┘   └──────────────┘
```

## Technology Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **React 18** - UI library with Server Components
- **TypeScript** - Static type checking
- **Tailwind CSS** - Utility-first CSS framework
- **Zustand** - State management
- **Lucide React** - Icon library

### Backend
- **Next.js API Routes** - Backend endpoints
- **Prisma** - ORM and database toolkit
- **NextAuth.js** - Authentication
- **Zod** - Schema validation

### Database & Services
- **PostgreSQL** - Primary database
- **Stripe** - Payment processing
- **NextAuth** - Authentication provider

### Development & DevOps
- **TypeScript** - Type safety
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **GitHub Actions** - CI/CD
- **Git** - Version control

## Getting Started

### Prerequisites
- Node.js 18.x or 20.x
- PostgreSQL 13+
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/alrod-dev/next-commerce.git
cd next-commerce
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```

Update `.env.local` with your values:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/next_commerce"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-min-32-chars"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

4. Set up the database
```bash
npm run db:push
npm run db:seed
```

5. Start the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

```bash
# Development
npm run dev           # Start dev server
npm run build         # Build for production
npm start             # Start production server

# Code Quality
npm run lint          # Run ESLint
npm run format        # Format code with Prettier
npm run type-check    # Check TypeScript types

# Database
npm run db:push       # Push schema to database
npm run db:migrate    # Create migration
npm run db:studio     # Open Prisma Studio
npm run db:seed       # Seed database with sample data
```

## Project Structure

```
next-commerce/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── api/                  # API routes
│   │   │   ├── auth/
│   │   │   ├── products/
│   │   │   ├── cart/
│   │   │   ├── checkout/
│   │   │   ├── reviews/
│   │   │   ├── admin/
│   │   │   └── webhooks/
│   │   ├── products/             # Product pages
│   │   ├── checkout/             # Checkout flow
│   │   ├── account/              # User account
│   │   ├── admin/                # Admin dashboard
│   │   ├── layout.tsx            # Root layout
│   │   └── page.tsx              # Homepage
│   ├── components/               # React components
│   │   ├── layout/               # Layout components
│   │   ├── products/             # Product components
│   │   ├── checkout/             # Checkout components
│   │   └── ui/                   # Reusable UI components
│   ├── lib/                      # Utility functions
│   │   ├── auth.ts               # NextAuth config
│   │   ├── prisma.ts             # Prisma singleton
│   │   ├── stripe.ts             # Stripe client
│   │   ├── utils.ts              # Helper functions
│   │   └── validators.ts         # Zod schemas
│   ├── store/                    # Zustand stores
│   ├── styles/                   # Global styles
│   ├── types/                    # TypeScript types
│   └── middleware.ts             # Auth middleware
├── prisma/
│   ├── schema.prisma             # Database schema
│   └── seed.ts                   # Seed script
├── public/                       # Static files
├── .github/
│   └── workflows/                # CI/CD workflows
├── .env.example                  # Example env vars
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── README.md
```

## API Documentation

### Authentication
- `POST /api/auth/signin` - Sign in with email/password
- `POST /api/auth/callback/google` - Google OAuth callback
- `GET /api/auth/session` - Get current session

### Products
- `GET /api/products` - List products (with filters, search, pagination)
- `GET /api/products/[id]` - Get product details

### Cart
- `GET /api/cart` - Get cart items
- `POST /api/cart` - Add item to cart
- `PUT /api/cart` - Update cart item quantity
- `DELETE /api/cart` - Remove item from cart

### Orders
- `POST /api/checkout` - Create checkout session
- `GET /api/orders` - Get user orders

### Reviews
- `GET /api/reviews` - Get product reviews
- `POST /api/reviews` - Create review

### Admin
- `GET /api/admin/products` - List products (admin)
- `POST /api/admin/products` - Create product (admin)
- `GET /api/admin/orders` - List orders (admin)
- `PUT /api/admin/orders` - Update order (admin)

### Webhooks
- `POST /api/webhooks/stripe` - Stripe webhook handler

## Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Docker
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Environment Variables (Production)
- Set all `.env.local` variables in your hosting platform
- Ensure database URL points to production database
- Set secure NextAuth secret (32+ characters)
- Use production Stripe keys

## Testing

### Manual Testing Checklist
- [ ] Create product catalog
- [ ] Search and filter products
- [ ] Add items to cart
- [ ] Update cart quantities
- [ ] Create account
- [ ] Sign in with Google
- [ ] Complete checkout
- [ ] Verify Stripe webhook
- [ ] View order history
- [ ] Leave product review

### Test Stripe Cards
- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002
- **3D Secure**: 4000 2500 0000 3010

## Performance Optimizations

- **Server Components** - Render components on the server
- **Streaming** - Progressive page loads with Suspense
- **Image Optimization** - Automatic image optimization
- **Caching** - ISR and API caching strategies
- **Code Splitting** - Automatic code splitting
- **Database Indexing** - Optimized Prisma queries

## Security Features

- **SQL Injection Protection** - Prisma ORM
- **XSS Protection** - React sanitization
- **CSRF Protection** - NextAuth built-in
- **Authentication** - NextAuth.js
- **Authorization** - Role-based access control
- **PCI Compliance** - Stripe handles payments
- **HTTPS** - Enforced in production
- **Environment Variables** - Secure secrets

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

**Alfredo Wiesner** - Senior Software Engineer
- GitHub: [@alrod-dev](https://github.com/alrod-dev)
- Portfolio: [alrod.dev](https://alrod.dev)
- Email: alrod.dev@gmail.com

## Support

For support, email alrod.dev@gmail.com or open an issue on GitHub.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)
- Payment processing by [Stripe](https://stripe.com/)
- Icons by [Lucide](https://lucide.dev/)
- Database by [PostgreSQL](https://www.postgresql.org/)

---

Made with ❤️ by Alfredo Wiesner
