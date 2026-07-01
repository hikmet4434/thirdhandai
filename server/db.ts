import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "@shared/schema";

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Standart node-postgres sürücüsü: hem Coolify/yerel Postgres hem de Neon
// (standart bağlantı dizesiyle) ile çalışır. SSL, bağlantı dizesinde
// `sslmode=require` varsa ya da PGSSL=true ise etkinleşir.
const url = process.env.DATABASE_URL;
const needsSsl =
  process.env.PGSSL === "true" ||
  /sslmode=require/.test(url) ||
  /\.neon\.tech/.test(url);

export const pool = new pg.Pool({
  connectionString: url,
  ssl: needsSsl ? { rejectUnauthorized: false } : undefined,
});

export const db = drizzle(pool, { schema });
