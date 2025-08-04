// drizzle.config.ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./server/database/schema/index.ts", // ✅ BENAR
  out: "./drizzle/migrations", // Folder output migrasi
  dbCredentials: {
    url: process.env.DATABASE_URL!, // Atau bisa juga pakai 'url' aja
  },
});
