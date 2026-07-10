import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const result = dotenv.config({ path: resolve(__dirname, '..', '.env') });
if (result.error) {
    console.error('Failed to load .env file:', result.error.message);
} else {
    console.log('DB config loaded — host:', process.env.DB_HOST, '| port:', process.env.DB_PORT, '| name:', process.env.DB_NAME);
}



const config = {
    port: Number(process.env.PORT) || 5000,
    db: {
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT) || 5432,
        name: process.env.DB_NAME || 'aone',
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || '',
        ssl: process.env.DB_SSL === 'true' || process.env.NODE_ENV === 'production',
    },
};

export default config;
