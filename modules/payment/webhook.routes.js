// ========================================
// WEBHOOK ROUTES
// ========================================

const express =
require("express");

const router =
express.Router();

const crypto =
require("crypto");

const paymentModel =
require("./payment.model");

const subscriptionModel =
require("./subscription.model");

// ========================================
// PAYSTACK WEBHOOK
// ========================================

router.post(

   "/paystack",

   express.json({

      verify: (
         req,
         res,
         buf
      ) => {

         req.rawBody =
         buf.toString();

      }

   }),

   async (
      req,
      res
   ) => {

      try {

         // ======================
         // VERIFY SIGNATURE
         // ======================

         const hash =

         crypto
         .createHmac(

            "sha512",

            process.env
            .PAYSTACK_SECRET_KEY

         )

         .update(req.rawBody)

         .digest("hex");

         const signature =
         req.headers[
            "x-paystack-signature"
         ];

         if (
            hash !== signature
         ) {

            return res
            .status(401)
            .send("Invalid signature");

         }

         // ======================
         // EVENT
         // ======================

         const event =
         req.body;

         // ======================
         // SUCCESS PAYMENT
         // ======================

         if (

            event.event ===
            "charge.success"

         ) {

            const data =
            event.data;

            const reference =
            data.reference;

            // CHECK EXISTING

            const existing =
            await paymentModel
            .findByReference(
               reference
            );

            if(existing){

               return res
               .status(200)
               .send("Already processed");

            }

            // 30 DAYS

            const expiry =
            new Date();

            expiry.setDate(
               expiry.getDate() + 30
            );

            // SAVE PAYMENT

            await paymentModel
            .savePayment({

               user_id:
               data.metadata.userId,

               email:
               data.customer.email,

               reference,

               amount:
               data.amount / 100,

               paid_at:
               new Date(),

               expires_at:
               expiry,

               status:
               "success"

            });

            // ACTIVATE SUBSCRIPTION

            await subscriptionModel
            .activatePremium(

               data.metadata.userId,

               expiry

            );

         }

         return res
         .status(200)
         .send("Webhook received");

      } catch(error){

         console.error(error);

         return res
         .status(500)
         .send("Webhook failed");

      }

   }

);

// ========================================
// EXPORT
// ========================================

module.exports =
router;