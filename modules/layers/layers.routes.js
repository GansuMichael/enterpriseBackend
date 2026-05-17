const router =
require("express").Router();

// =====================================
// CONTROLLER
// =====================================

const controller =
require("./layers.controller");

// =====================================
// MIDDLEWARE
// =====================================

const auth =
require("../../middleware/auth");

const subscription =
require("../../middleware/subscription");

// =====================================
// CREATE RECORD
// =====================================

router.post(

   "/",

   auth,

   subscription,

   controller.createRecord

);

// =====================================
// GET ALL RECORDS
// =====================================

router.get(

   "/",

   auth,

   controller.getRecords

);

// =====================================
// GET SINGLE RECORD
// =====================================

router.get(

   "/:id",

   auth,

   controller.getSingleRecord

);

// =====================================
// UPDATE RECORD
// =====================================

router.put(

   "/:id",

   auth,

   subscription,

   controller.updateRecord

);

// =====================================
// DELETE RECORD
// =====================================

router.delete(

   "/:id",

   auth,

   subscription,

   controller.deleteRecord

);

// =====================================
// ANALYTICS
// =====================================

router.get(

   "/analytics/summary",

   auth,

   controller.getAnalytics

);

// =====================================
// EXPORT REPORT
// =====================================

router.get(

   "/export/report",

   auth,

   controller.exportReport

);

// =====================================
// SEARCH RECORDS
// =====================================

router.get(

   "/search/query",

   auth,

   controller.searchRecords

);

// =====================================
// FILTER BY DATE
// =====================================

router.get(

   "/filter/date",

   auth,

   controller.filterByDate

);

// =====================================
// MORTALITY ANALYSIS
// =====================================

router.get(

   "/analytics/mortality",

   auth,

   controller.mortalityAnalysis

);

// =====================================
// FEED ANALYSIS
// =====================================

router.get(

   "/analytics/feed",

   auth,

   controller.feedAnalysis

);

// =====================================
// AI INSIGHTS
// =====================================

router.get(

   "/analytics/ai-insights",

   auth,

   controller.aiInsights

);

// =====================================
// LOW PRODUCTION ALERTS
// =====================================

router.get(

   "/alerts/production",

   auth,

   controller.productionAlerts

);

// =====================================
// INVENTORY CONNECTION
// =====================================

router.get(

   "/inventory/status",

   auth,

   controller.inventoryStatus

);

// =====================================
// DASHBOARD SUMMARY
// =====================================

router.get(

   "/dashboard/summary",

   auth,

   controller.dashboardSummary

);

// =====================================
// MODULE EXPORT
// =====================================

module.exports = router;