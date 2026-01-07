# Professional Authentication Setup

This document describes the professional authentication system implemented using NextAuth.js, Prisma, and SQLite.

## 🎯 Overview

The authentication system has been completely rewritten to use:
- **NextAuth.js (Auth.js)** for secure session management
- **Prisma + SQLite** for database storage
- **bcryptjs** for password hashing
- **HttpOnly cookies** for secure session storage
- **Role-based access control (RBAC)** for admin/user separation

## 📋 Prerequisites

- Node.js 20+
- npm or yarn

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key-change-this-in-production"
NEXTAUTH_URL="http://localhost:3000"
```

**Important**: Generate a secure `NEXTAUTH_SECRET` for production:
```bash
openssl rand -base64 32
```

### 3. Database Setup

```bash
# Generate Prisma Client
npm run db:generate

# Run migrations
npm run db:migrate

# Seed admin user
npm run db:seed
```

This will create:
- SQLite database at `prisma/dev.db`
- Admin user:
  - Email: `admin@example.com`
  - Password: `Admin@12345`
  - Role: `admin`

### 4. Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 🔐 Authentication Flow

### User Registration
1. User fills registration form at `/auth/register`
2. Data is sent to `/api/auth/register`
3. Password is hashed with bcrypt (12 rounds)
4. User is created in database
5. User is automatically logged in via NextAuth
6. Redirect based on role:
   - Admin → `/admin`
   - User → `/dashboard`

### User Login
1. User fills login form at `/auth/login`
2. Credentials are sent to NextAuth
3. NextAuth validates against database
4. Session is created in HttpOnly cookie
5. Redirect based on role

### Admin Access
- Admin login: `/admin/login` (uses same NextAuth)
- Only users with `role: "admin"` can access `/admin/*` routes
- Non-admin users are redirected to `/dashboard`

## 📁 File Structure

### Created/Modified Files

#### Database & Auth Core
- `prisma/schema.prisma` - Database schema
- `prisma/seed.ts` - Seed script for admin user
- `src/lib/prisma.ts` - Prisma client singleton
- `src/lib/auth-server.ts` - Server-side auth utilities (password hashing, validation)

#### NextAuth Configuration
- `app/api/auth/[...nextauth]/route.ts` - NextAuth handler
- `src/types/next-auth.d.ts` - TypeScript types for NextAuth

#### API Routes
- `app/api/auth/register/route.ts` - User registration endpoint
- `app/api/auth/me/route.ts` - Get current user session
- `app/api/users/route.ts` - Get users list (admin only)

#### UI Components
- `app/auth/login/page.tsx` - Updated to use NextAuth
- `app/auth/register/page.tsx` - Updated to use API route
- `app/admin/login/page.tsx` - Admin login page
- `middleware.ts` - RBAC middleware

#### Configuration
- `.env` - Environment variables
- `package.json` - Added scripts and dependencies

## 🧪 Testing

### Test Cases

1. **Wrong Password Fails**
   - Go to `/auth/login`
   - Enter correct email but wrong password
   - Should show error message

2. **Admin Can Access /admin**
   - Login as admin (`admin@example.com` / `Admin@12345`)
   - Should redirect to `/admin`
   - Can access all `/admin/*` routes

3. **Normal User Cannot Access /admin**
   - Register a new user or login as regular user
   - Try to access `/admin` or `/admin/users`
   - Should be redirected to `/dashboard`

4. **Registration Works**
   - Go to `/auth/register`
   - Fill form and submit
   - Should create user and auto-login
   - Should redirect to `/dashboard`

## 🔒 Security Features

1. **Password Hashing**: bcrypt with 12 rounds
2. **HttpOnly Cookies**: Session stored in secure cookies
3. **Rate Limiting**: Basic rate limiting on registration (5 per 15 minutes)
4. **Input Validation**: Email/phone format, password strength
5. **RBAC**: Middleware enforces role-based access
6. **SQL Injection Protection**: Prisma ORM prevents SQL injection

## 🗄️ Database Schema

```prisma
model User {
  id            String   @id @default(cuid())
  name          String
  email         String?  @unique
  phone         String?
  passwordHash  String
  role          String   @default("user") // "user" | "admin"
  status        String   @default("active") // "active" | "banned"
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  orders        Int      @default(0)
  totalSpent    String   @default("0")
  visibleGiftCards String?
}
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:generate` - Generate Prisma Client
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed admin user
- `npm run db:studio` - Open Prisma Studio (database GUI)

## ⚠️ Important Notes

1. **localStorage Auth Removed**: All localStorage-based authentication has been removed. The system now uses server-side sessions.

2. **Single Port**: The application runs on a single port (3000). Admin and user panels are separated by routes, not ports.

3. **Database File**: The SQLite database file (`dev.db`) should be added to `.gitignore` in production. Use a proper database (PostgreSQL, MySQL) for production.

4. **NEXTAUTH_SECRET**: Must be set in production. Use a strong, random secret.

5. **CORS**: Currently configured for localhost. Update CORS settings in `next.config.ts` for production.

## 🚧 Remaining Tasks

The following components still need to be updated to remove localStorage dependencies:
- `src/components/auth/AuthProvider.tsx` - Update to use NextAuth session
- `app/page.tsx` - Update to use NextAuth session
- `app/admin/users/page.tsx` - Update to fetch from API instead of localStorage
- Other components that check `isLoggedIn()` or use `getSessionUser()`

## 📚 Next Steps

1. Update remaining UI components to use NextAuth
2. Add password reset functionality
3. Add email verification
4. Implement proper rate limiting (Redis-based)
5. Add audit logging
6. Migrate to PostgreSQL for production



