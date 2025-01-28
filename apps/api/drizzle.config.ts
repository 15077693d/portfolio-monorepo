import { defineConfig } from 'drizzle-kit';
import 'dotenv/config';
export default defineConfig({
  schema: './src/drizzle/schema/**.schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
