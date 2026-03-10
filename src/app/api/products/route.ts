import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { productFilterSchema } from '@/lib/validators';
import type { PaginatedResponse, Product } from '@/types';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const parsed = productFilterSchema.parse({
      search: searchParams.get('search'),
      category: searchParams.get('category'),
      minPrice: searchParams.get('minPrice'),
      maxPrice: searchParams.get('maxPrice'),
      minRating: searchParams.get('minRating'),
      sort: searchParams.get('sort'),
      page: searchParams.get('page'),
      limit: searchParams.get('limit'),
    });

    const skip = (parsed.page - 1) * parsed.limit;

    const where: any = {
      published: true,
    };

    if (parsed.search) {
      where.OR = [
        { name: { contains: parsed.search, mode: 'insensitive' } },
        { description: { contains: parsed.search, mode: 'insensitive' } },
      ];
    }

    if (parsed.category) {
      where.category = {
        slug: parsed.category,
      };
    }

    if (parsed.minPrice !== undefined || parsed.maxPrice !== undefined) {
      where.price = {};
      if (parsed.minPrice !== undefined) {
        where.price.gte = parsed.minPrice;
      }
      if (parsed.maxPrice !== undefined) {
        where.price.lte = parsed.maxPrice;
      }
    }

    if (parsed.minRating !== undefined) {
      where.rating = { gte: parsed.minRating };
    }

    const orderBy: any = {};
    switch (parsed.sort) {
      case 'price-asc':
        orderBy.price = 'asc';
        break;
      case 'price-desc':
        orderBy.price = 'desc';
        break;
      case 'rating':
        orderBy.rating = 'desc';
        break;
      case 'newest':
        orderBy.createdAt = 'desc';
        break;
      case 'popular':
        orderBy.ratingCount = 'desc';
        break;
      default:
        orderBy.createdAt = 'desc';
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy,
        skip,
        take: parsed.limit,
        include: { category: true },
      }),
      prisma.product.count({ where }),
    ]);

    const response: PaginatedResponse<Product> = {
      data: products as Product[],
      total,
      page: parsed.page,
      pageSize: parsed.limit,
      totalPages: Math.ceil(total / parsed.limit),
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
