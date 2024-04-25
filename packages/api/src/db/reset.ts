import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from 'pg';
import { getDBUri } from "../config";
import { comments, members, posts, users, votes } from "./schema";

const pool = new Pool({
  connectionString: getDBUri()
});

const db = drizzle(pool);

async function main() {
  await db.delete(votes).execute();
  await db.delete(comments).execute();
  await db.delete(posts).execute();
  await db.delete(members).execute();
  await db.delete(users).execute();
}

main()
.then()
.catch((err) => {
  console.error('Error resetting database', err);
  process.exit(0);
});
