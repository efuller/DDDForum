import { Client } from 'pg';
import { getDBUri } from './config';
import { drizzle } from "drizzle-orm/node-postgres";

const client = new Client({
    connectionString: getDBUri()
});

client.connect((err) => {
    if (err) {
        console.error('Error connecting to database', err.stack);
    } else {
        console.log('Connected to database');
    }
});

const db = drizzle(client);
export { db };
