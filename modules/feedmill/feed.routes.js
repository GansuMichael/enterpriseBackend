const router =
require("express").Router();

const controller =
require("./feed.controller");

const auth =
require("../../middleware/auth");

router.post(
   "/",
   auth,
   controller.createFeed
);

router.get(
   "/",
   auth,
   controller.getFeeds
);

router.put(
   "/:id",
   auth,
   controller.updateFeed
);

router.delete(
   "/:id",
   auth,
   controller.deleteFeed
);

module.exports = router;