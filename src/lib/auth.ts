import { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { prisma } from './prisma';

// Only validate secrets at runtime, not at build time
// During build, we use placeholder secrets, so skip this check
const isProduction = process.env.NODE_ENV === 'production';
const isBuildTime = process.env.NEXTAUTH_SECRET?.includes('build-placeholder');

if (isProduction && !process.env.NEXTAUTH_SECRET && !isBuildTime) {
  throw new Error('NEXTAUTH_SECRET is not set');
}

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  if (isProduction) {
    console.warn('Google OAuth is not configured');
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'test@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          throw new Error('Invalid credentials');
        }

        // In production, use bcrypt or similar for password hashing
        // This is a simplified example
        const isPasswordValid = credentials.password === user.password;

        if (!isPasswordValid) {
          throw new Error('Invalid credentials');
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        };
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }

      if (account?.provider === 'google') {
        const existingUser = await prisma.user.findUnique({
          where: { email: user?.email || '' },
        });

        if (!existingUser && user?.email) {
          const newUser = await prisma.user.create({
            data: {
              email: user.email,
              name: user.name || undefined,
              image: user.image || undefined,
            },
          });
          token.id = newUser.id;
        } else if (existingUser) {
          token.id = existingUser.id;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
  events: {
    async signIn({ user, account }) {
      if (account?.provider !== 'credentials') {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email || '' },
        });

        if (!existingUser && user.email) {
          await prisma.user.create({
            data: {
              email: user.email,
              name: user.name || undefined,
              image: user.image || undefined,
            },
          });
        }
      }
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
};
