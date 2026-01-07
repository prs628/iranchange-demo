// PHASE 1: NextAuth disabled temporarily
// This route is commented out to prevent NextAuth from running
// Uncomment after Prisma is fixed in Phase 2

/*
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { findUserByEmailOrPhone, verifyPassword } from '@/lib/auth-server'
import { prisma } from '@/lib/prisma'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        emailOrPhone: { label: 'Email or Phone', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.emailOrPhone || !credentials?.password) {
          return null
        }

        const user = await findUserByEmailOrPhone(credentials.emailOrPhone)
        
        if (!user) {
          return null
        }

        const isValid = await verifyPassword(credentials.password, user.passwordHash)
        
        if (!isValid) {
          return null
        }

        // Check if user is banned
        if (user.status === 'banned') {
          return null
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email || undefined,
          phone: user.phone || undefined,
          role: user.role,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
        token.phone = user.phone
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
        session.user.phone = token.phone as string | undefined
      }
      return session
    },
  },
  pages: {
    signIn: '/auth/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
*/

// PHASE 1: Return 404 to prevent NextAuth from running
export async function GET() {
  return new Response("NextAuth disabled - Phase 1", { status: 404 });
}

export async function POST() {
  return new Response("NextAuth disabled - Phase 1", { status: 404 });
}


