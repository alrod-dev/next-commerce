import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

let prismaClient: PrismaClient | null = null;

// During build time, don't try to connect to the database
if (process.env.NODE_ENV === 'production' && process.env.DATABASE_URL?.includes('build')) {
  // Build time - create dummy prisma without connection
  console.log('Build time detected - skipping Prisma client initialization');
} else {
  try {
    prismaClient =
      globalForPrisma.prisma ||
      new PrismaClient({
        log: process.env.NODE_ENV === 'development' ? ['query'] : [],
      });

    if (process.env.NODE_ENV !== 'production' && prismaClient) {
      globalForPrisma.prisma = prismaClient;
    }
  } catch (error) {
    console.error('Failed to initialize Prisma client:', error);
    prismaClient = null;
  }
}

export const prisma = prismaClient as PrismaClient;
