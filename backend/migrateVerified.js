/**
 * One-time migration: mark all existing Google OAuth users as email-verified,
 * since their email was already validated by Google.
 * 
 * Local (email/password) users who signed up before verification was added
 * are also marked as verified so they aren't locked out.
 */
import { sequelize } from './Db/db.js';

// Mark ALL existing users as verified (they all predate the verification feature)
const [updatedCount] = await sequelize.query(
  `UPDATE "Users" SET "isEmailVerified" = true, "emailVerifyToken" = NULL, "emailVerifyExpires" = NULL WHERE "isEmailVerified" = false`
);

console.log(`✅ Marked existing users as verified.`);

// Show current state
const [rows] = await sequelize.query(
  `SELECT id, email, "googleId", "isEmailVerified" FROM "Users" ORDER BY id`
);
console.log(JSON.stringify(rows, null, 2));

await sequelize.close();
