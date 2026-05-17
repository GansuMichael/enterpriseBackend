const pool =
require("../../config/postgres");

exports.upgrade =
async (userId) => {

   // 30 DAYS PREMIUM

   const expiry =
   new Date();

   expiry.setDate(
      expiry.getDate() + 30
   );

   await pool.query(

      `
      UPDATE subscriptions

      SET
         plan = $1,
         status = $2,
         expires_at = $3

      WHERE user_id = $4
      `,

      [
         "premium",

         "active",

         expiry,

         userId
      ]

   );

   return {

      message:
      "Subscription upgraded"

   };

};