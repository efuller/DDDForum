import { config } from "dotenv";

config({
    path: '.env.development'
});

export const PORT = process.env.PORT || 3001;

export function getDBUri() {
    const config = {
        dbHost: process.env.POSTGRES_HOST,
        dbUser: process.env.POSTGRES_USER,
        dbPassword: process.env.POSTGRES_PASSWORD,
        dbName: process.env.POSTGRES_DB,
        dbPort: process.env.POSTGRES_PORT || 5432
    };

    return `postgres://${config.dbUser}:${config.dbPassword}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
}