const express =
require("express");

const router =
express.Router();

const authMiddleware =
require("../middleware/authMiddleware");

const {

   upgradeSubscription

} = require(
"./subscription.controller"
);

router.post(

   "/upgrade",

   authMiddleware,

   upgradeSubscription

);

module.exports = router;