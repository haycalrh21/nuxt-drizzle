// drizzle.config.ts
import { defineConfig } from "drizzle-kit";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
export default defineConfig({
  dialect: "postgresql",
  schema: "./server/database/schema/index.ts", // ✅ BENAR
  out: "./drizzle/migrations", // Folder output migrasi
  dbCredentials: {
    url: process.env.DATABASE_URL!, // Atau bisa juga pakai 'url' aja
  },
});

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle(pool);
