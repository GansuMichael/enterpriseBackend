const axios =
require("axios");

const pool =
require("../../config/postgres");

// ========================================
// INITIALIZE PAYMENT
// ========================================

exports.initialize =
async (user, data) => {

   const amount =
   10000;

   // PAYSTACK EXPECTS KOBO

   const response =
   await axios.post(

      "https://api.paystack.co/transaction/initialize",

      {

         email:
         data.email,

         amount:
         amount * 100

      },

      {

         headers: {

            Authorization:
            `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,

            "Content-Type":
            "application/json"

         }

      }

   );

   return {

      authorization_url:
      response.data.data.authorization_url,

      reference:
      response.data.data.reference

   };

};

// ========================================
// VERIFY PAYMENT
// ========================================

exports.verify =
async (
   reference,
   userId
) => {

   const response =
   await axios.get(

      `https://api.paystack.co/transaction/verify/${reference}`,

      {

         headers: {

            Authorization:
            `Bearer ${process.env.PAYSTACK_SECRET_KEY}`

         }

      }

   );

   const paymentData =
   response.data.data;

   // CHECK SUCCESS

   if(
      paymentData.status
      === "success"
   ){

      // 30 DAYS PREMIUM

      const expiry =
      new Date();

      expiry.setDate(
         expiry.getDate() + 30
      );

      // UPDATE SUBSCRIPTION

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
         "Payment verified. Premium activated."

      };

   }

   throw new Error(
      "Payment not successful"
   );

};