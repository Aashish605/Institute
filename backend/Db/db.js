import { Sequelize } from 'sequelize';
import env from './env.js';

const sequelize = new Sequelize(env.db.name, env.db.user, env.db.password, {
    host: env.db.host,
    port: env.db.port,
    dialect: 'postgres',
    logging: false,
    pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('PostgreSQL connected');
        await sequelize.sync({ alter: true });
        console.log('Models synchronized');
    } catch (error) {
        console.error('Unable to connect to PostgreSQL:', error.message);
        throw error;
    }
};

export { sequelize, connectDB };
export default connectDB;
