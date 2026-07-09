const { Pool } = require('./backend/node_modules/pg');
const pool = new Pool({
  user: 'postgres', host: 'localhost', database: 'institute',
  password: 'postgres', port: 5432,
});
async function run() {
  await pool.query('UPDATE "Payments" SET "courseId" = \'52c77f2e-95f9-412b-b02f-d411aa708f49\' WHERE "courseId" IS NULL AND "course" = \'Bridge Course (Science, Management)\'');
  console.log('Payment courseId fixed');

  const payments = await pool.query('SELECT id, "courseId", "course", status FROM "Payments"');
  console.log('Payments:', JSON.stringify(payments.rows, null, 2));
  process.exit(0);
}
run().catch(err => { console.log(err.message); process.exit(0); });
