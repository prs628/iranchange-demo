# Prisma Setup Instructions

## Phase 2: Fix Prisma Client Generation

### Prerequisites
- Node.js and npm installed
- Prisma schema exists at `prisma/schema.prisma`
- `.env` file with `DATABASE_URL` (or create one)

### Step 1: Clean Install

Run these commands in order:

```bash
# Remove node_modules and .next to start fresh
rm -rf node_modules .next

# Install dependencies
npm install

# Generate Prisma Client
npx prisma generate

# Run migrations (creates database if it doesn't exist)
npx prisma migrate dev --name init
```

### Step 2: Verify Installation

After running the commands above, verify:

1. **Prisma Client exists**: Check that `node_modules/.prisma/client` directory exists
2. **Database exists**: Check that `prisma/dev.db` (or your DATABASE_URL location) exists
3. **No import errors**: Try importing `@prisma/client` in a server file

### Step 3: Environment Variables

Make sure you have a `.env` file in the root with:

```env
DATABASE_URL="file:./dev.db"
```

Or for a different location:

```env
DATABASE_URL="file:./prisma/dev.db"
```

### Step 4: Turbopack Note

**IMPORTANT**: The app is configured to NOT use Turbopack (see `package.json`):
- `"dev": "TURBOPACK=0 next dev"`

This is because Prisma has known issues with Turbopack. Do NOT run with `--turbo` flag.

### Troubleshooting

If you get "Prisma Client not generated" errors:

1. Make sure you ran `npx prisma generate`
2. Check that `node_modules/.prisma/client` exists
3. Restart your dev server after generating
4. If using TypeScript, restart your TypeScript server

### After Prisma Works

Once Prisma is working, proceed to Phase 3 to re-enable NextAuth.

