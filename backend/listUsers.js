import { sequelize } from './Db/db.js';

const [rows] = await sequelize.query(
  `SELECT id, email, "googleId", "isEmailVerified", "createdAt" FROM "Users" ORDER BY "createdAt" DESC LIMIT 20`
);
console.log(JSON.stringify(rows, null, 2));
await sequelize.close();
