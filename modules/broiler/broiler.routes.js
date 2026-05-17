const router = require('express').Router();

const controller =
require('./broiler.controller');

const auth =
require('../../middleware/auth');

const upload =
require("../../shared/middleware/upload");

router.post(

   "/upload",

   upload.single("image"),

   controller.uploadImage

);

router.post(
   '/',
   auth,
   controller.createRecord
);

router.get(
   '/',
   auth,
   controller.getRecords
);

module.exports = router;