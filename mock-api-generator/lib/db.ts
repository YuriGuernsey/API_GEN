import { createClient } from "@libsql/client";

// Initialize Turso (PostgreSQL) database connection using API Token
export const client = createClient({
    //@ts-ignore
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });

