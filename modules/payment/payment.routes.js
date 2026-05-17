const express =
require("express");

const router =
express.Router();

const authMiddleware =
require("../middleware/authMiddleware");

const {

   initializePayment,
   verifyPayment

} = require(
"./payment.controller"
);

router.post(

   "/initialize",

   authMiddleware,

   initializePayment

);

router.get(

   "/verify/:reference",

   authMiddleware,

   verifyPayment

);

module.exports = router;