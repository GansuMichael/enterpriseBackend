const router = require('express').Router();

const controller =
require('./broiler.controller');

const auth =
require('../../middleware/auth');

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