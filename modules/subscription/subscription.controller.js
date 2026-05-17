const subscriptionService =
require("./subscription.service");

exports.upgradeSubscription =
async (req, res) => {

   try {

      const result =
      await subscriptionService.upgrade(
         req.user.userId
      );

      res.status(200).json(result);

   } catch(error){

      res.status(500).json({
         error: error.message
      });

   }

};