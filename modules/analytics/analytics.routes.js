const router =
require("express").Router();

const controller =
require("./analytics.controller");

const auth =
require("../../middleware/auth");

router.get(
   "/dashboard",
   auth,
   controller.dashboard
);

module.exports = router;