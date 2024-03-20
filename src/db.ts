import { Client } from 'pg';
import { getDBUri } from './config';

const db = new Client({
    connectionString: getDBUri()
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to database', err.stack);
    } else {
        console.log('Connected to database');
    }
});

export { db };
