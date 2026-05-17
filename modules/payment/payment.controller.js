const paymentService =
require("./payment.service");

exports.initializePayment =
async (req, res) => {

   try {

      const result =
      await paymentService.initialize(

         req.user,

         req.body

      );

      res.status(200)
      .json(result);

   } catch(error){

      res.status(500)
      .json({

         error:
         error.message

      });

   }

};

exports.verifyPayment =
async (req, res) => {

   try {

      const result =
      await paymentService.verify(

         req.params.reference,

         req.user.userId

      );

      res.status(200)
      .json(result);

   } catch(error){

      res.status(500)
      .json({

         error:
         error.message

      });

   }

};