import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Clear existing data
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.review.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  // Create categories
  const electronics = await prisma.category.create({
    data: {
      name: 'Electronics',
      slug: 'electronics',
      description: 'Latest gadgets and electronics',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    },
  });

  const fashion = await prisma.category.create({
    data: {
      name: 'Fashion',
      slug: 'fashion',
      description: 'Trendy clothing and accessories',
      image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&h=400&fit=crop',
    },
  });

  const home = await prisma.category.create({
    data: {
      name: 'Home & Garden',
      slug: 'home-garden',
      description: 'Home decoration and garden supplies',
      image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop',
    },
  });

  // Create products
  const products = [
    {
      name: 'Wireless Headphones Pro',
      slug: 'wireless-headphones-pro',
      description: 'Premium wireless headphones with active noise cancellation, 30-hour battery life, and premium sound quality.',
      price: 299.99,
      salePrice: 249.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop',
        'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=500&h=500&fit=crop',
      ],
      stock: 50,
      sku: 'WHP-001',
      rating: 4.8,
      ratingCount: 320,
      featured: true,
      categoryId: electronics.id,
    },
    {
      name: 'Smart Watch Ultra',
      slug: 'smart-watch-ultra',
      description: 'Advanced smartwatch with health tracking, GPS, and 7-day battery life.',
      price: 399.99,
      salePrice: 349.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
      images: [],
      stock: 30,
      sku: 'SWU-001',
      rating: 4.6,
      ratingCount: 245,
      featured: true,
      categoryId: electronics.id,
    },
    {
      name: 'Premium Cotton T-Shirt',
      slug: 'premium-cotton-tshirt',
      description: 'Comfortable 100% organic cotton t-shirt, perfect for everyday wear.',
      price: 29.99,
      salePrice: null,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
      images: [],
      stock: 100,
      sku: 'PCNT-001',
      rating: 4.4,
      ratingCount: 180,
      featured: true,
      categoryId: fashion.id,
    },
    {
      name: 'Designer Sneakers',
      slug: 'designer-sneakers',
      description: 'Stylish and comfortable designer sneakers for casual and sports wear.',
      price: 89.99,
      salePrice: 74.99,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
      images: [],
      stock: 60,
      sku: 'DSNE-001',
      rating: 4.5,
      ratingCount: 210,
      featured: true,
      categoryId: fashion.id,
    },
    {
      name: 'Modern Desk Lamp',
      slug: 'modern-desk-lamp',
      description: 'Energy-efficient LED desk lamp with adjustable brightness and color temperature.',
      price: 59.99,
      salePrice: 49.99,
      image: 'https://images.unsplash.com/photo-1565636192335-14a8d56a8b21?w=500&h=500&fit=crop',
      images: [],
      stock: 45,
      sku: 'MDL-001',
      rating: 4.7,
      ratingCount: 150,
      featured: true,
      categoryId: home.id,
    },
    {
      name: 'Bluetooth Speaker',
      slug: 'bluetooth-speaker',
      description: 'Portable Bluetooth speaker with 360-degree sound and waterproof design.',
      price: 79.99,
      salePrice: 64.99,
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop',
      images: [],
      stock: 70,
      sku: 'BTS-001',
      rating: 4.3,
      ratingCount: 280,
      featured: false,
      categoryId: electronics.id,
    },
  ];

  for (const product of products) {
    await prisma.product.create({
      data: {
        ...product,
        salePrice: product.salePrice || undefined,
      },
    });
  }

  // Create test user
  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'user@example.com',
      image: null,
      role: 'USER',
    },
  });

  // Create admin user
  const admin = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@example.com',
      image: null,
      role: 'ADMIN',
    },
  });

  // Create sample reviews
  const allProducts = await prisma.product.findMany();
  for (const product of allProducts.slice(0, 3)) {
    await prisma.review.create({
      data: {
        rating: 5,
        title: 'Excellent product!',
        content: 'This product exceeded my expectations. Great quality and fast delivery.',
        verified: true,
        helpful: 45,
        userId: user.id,
        productId: product.id,
      },
    });
  }

  console.log('✓ Database seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
