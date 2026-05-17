// ========================================
// SUBSCRIPTION MODEL
// ========================================

const pool =
require("../../config/postgres");

// ========================================
// CREATE TABLE
// ========================================

exports.createTable =
async () => {

   const query =

   `
   CREATE TABLE IF NOT EXISTS subscriptions (

      id SERIAL PRIMARY KEY,

      user_id INTEGER
      UNIQUE NOT NULL,

      plan VARCHAR(50)
      DEFAULT 'free',

      status VARCHAR(50)
      DEFAULT 'inactive',

      starts_at TIMESTAMP,

      expires_at TIMESTAMP,

      created_at TIMESTAMP
      DEFAULT CURRENT_TIMESTAMP

   );
   `;

   await pool.query(query);

};

// ========================================
// CREATE SUBSCRIPTION
// ========================================

exports.createSubscription =
async (subscription) => {

   const result =
   await pool.query(

      `
      INSERT INTO subscriptions (

         user_id,
         plan,
         status,
         starts_at,
         expires_at

      )

      VALUES (

         $1,$2,$3,$4,$5

      )

      RETURNING *;
      `,

      [

         subscription.user_id,

         subscription.plan ||
         "free",

         subscription.status ||
         "inactive",

         subscription.starts_at,

         subscription.expires_at

      ]

   );

   return result.rows[0];

};

// ========================================
// FIND USER SUBSCRIPTION
// ========================================

exports.findByUser =
async (userId) => {

   const result =
   await pool.query(

      `
      SELECT *
      FROM subscriptions

      WHERE user_id = $1
      `,

      [userId]

   );

   return result.rows[0];

};

// ========================================
// ACTIVATE PREMIUM
// ========================================

exports.activatePremium =
async (
   userId,
   expiry
) => {

   const result =
   await pool.query(

      `
      UPDATE subscriptions

      SET

         plan = 'premium',

         status = 'active',

         starts_at = NOW(),

         expires_at = $1

      WHERE user_id = $2

      RETURNING *;
      `,

      [

         expiry,

         userId

      ]

   );

   return result.rows[0];

};

// ========================================
// DOWNGRADE EXPIRED USERS
// ========================================

exports.downgradeExpired =
async () => {

   await pool.query(

      `
      UPDATE subscriptions

      SET

         plan = 'free',

         status = 'expired'

      WHERE expires_at < NOW()
      `

   );

};

// ========================================
// DELETE SUBSCRIPTION
// ========================================

exports.deleteSubscription =
async (userId) => {

   await pool.query(

      `
      DELETE FROM subscriptions

      WHERE user_id = $1
      `,

      [userId]

   );

};