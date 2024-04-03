import 'dotenv/config';
import type { Config } from 'drizzle-kit';
import { getDBUri } from "./src/config";

export default {
  schema: './src/db/schema.ts',
  out: './src/db/migrations',
  driver: 'pg', // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
  dbCredentials: {
    connectionString: getDBUri(),
  },
  verbose: true,
} satisfies Config;