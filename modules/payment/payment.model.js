// ========================================
// PAYMENT MODEL
// ========================================

const pool =
require("../../config/postgres");

// ========================================
// CREATE PAYMENTS TABLE
// ========================================

exports.createTable =
async () => {

   const query =

   `
   CREATE TABLE IF NOT EXISTS payments (

      id SERIAL PRIMARY KEY,

      user_id INTEGER NOT NULL,

      email VARCHAR(255) NOT NULL,

      reference VARCHAR(255)
      UNIQUE NOT NULL,

      amount NUMERIC(12,2)
      NOT NULL,

      currency VARCHAR(10)
      DEFAULT 'NGN',

      provider VARCHAR(50)
      DEFAULT 'paystack',

      plan VARCHAR(50)
      DEFAULT 'premium',

      status VARCHAR(50)
      DEFAULT 'pending',

      paid_at TIMESTAMP,

      expires_at TIMESTAMP,

      created_at TIMESTAMP
      DEFAULT CURRENT_TIMESTAMP

   );
   `;

   await pool.query(query);

};

// ========================================
// SAVE PAYMENT
// ========================================

exports.savePayment =
async (payment) => {

   const query =

   `
   INSERT INTO payments (

      user_id,
      email,
      reference,
      amount,
      currency,
      provider,
      plan,
      status,
      paid_at,
      expires_at

   )

   VALUES (

      $1,$2,$3,$4,$5,
      $6,$7,$8,$9,$10

   )

   RETURNING *;
   `;

   const values = [

      payment.user_id,

      payment.email,

      payment.reference,

      payment.amount,

      payment.currency ||

      "NGN",

      payment.provider ||

      "paystack",

      payment.plan ||

      "premium",

      payment.status ||

      "success",

      payment.paid_at,

      payment.expires_at

   ];

   const result =
   await pool.query(
      query,
      values
   );

   return result.rows[0];

};

// ========================================
// FIND PAYMENT BY REFERENCE
// ========================================

exports.findByReference =
async (reference) => {

   const result =
   await pool.query(

      `
      SELECT *
      FROM payments
      WHERE reference = $1
      `,

      [reference]

   );

   return result.rows[0];

};

// ========================================
// FIND USER PAYMENTS
// ========================================

exports.findByUser =
async (userId) => {

   const result =
   await pool.query(

      `
      SELECT *
      FROM payments

      WHERE user_id = $1

      ORDER BY created_at DESC
      `,

      [userId]

   );

   return result.rows;

};

// ========================================
// UPDATE PAYMENT STATUS
// ========================================

exports.updateStatus =
async (
   reference,
   status
) => {

   const result =
   await pool.query(

      `
      UPDATE payments

      SET status = $1

      WHERE reference = $2

      RETURNING *
      `,

      [

         status,

         reference

      ]

   );

   return result.rows[0];

};

// ========================================
// DELETE PAYMENT
// ========================================

exports.deletePayment =
async (id) => {

   await pool.query(

      `
      DELETE FROM payments
      WHERE id = $1
      `,

      [id]

   );

};

// ========================================
// TOTAL REVENUE
// ========================================

exports.totalRevenue =
async () => {

   const result =
   await pool.query(

      `
      SELECT
      SUM(amount)
      AS total

      FROM payments

      WHERE status = 'success'
      `

   );

   return result.rows[0];

};