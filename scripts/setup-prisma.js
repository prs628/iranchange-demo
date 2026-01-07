// Post-install script to setup Prisma Client default.js
const fs = require('fs');
const path = require('path');

const defaultJsPath = path.join(__dirname, '../node_modules/.prisma/client/default.js');

// Create default.js that exports from client.ts
// Next.js webpack will transpile the TypeScript file
const defaultJsContent = `// Prisma Client default export
// This file exports PrismaClient from the TypeScript client file
// Next.js webpack will transpile the .ts file during build

// Use .ts extension so webpack can resolve and transpile it
module.exports = require('./client.ts');
`;

try {
  fs.writeFileSync(defaultJsPath, defaultJsContent);
  console.log('✅ Created default.js for Prisma Client');
} catch (error) {
  console.error('❌ Error creating default.js:', error);
  process.exit(1);
}



