module.exports =
(req, res, next) => {

   // CHECK STATUS

   if(
      req.user.subscriptionStatus
      === "expired"
   ){

      return res.status(403)
      .json({

         message:
         "Trial expired. Upgrade required."

      });

   }

   // CHECK PLAN

   if(
      req.user.plan !==
      "premium"
   ){

      return res.status(403)
      .json({

         message:
         "Premium subscription required."

      });

   }

   next();

};