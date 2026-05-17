const router =
require("express").Router();

const controller =
require("./finance.controller");

const auth =
require("../../middleware/auth");

// =====================================
// SALES
// =====================================

router.post(
   "/sales",
   auth,
   controller.createSale
);

router.get(
   "/sales",
   auth,
   controller.getSales
);

// =====================================
// EXPENSES
// =====================================

router.post(
   "/expenses",
   auth,
   controller.createExpense
);

router.get(
   "/expenses",
   auth,
   controller.getExpenses
);

// =====================================
// DASHBOARD
// =====================================

router.get(
   "/dashboard",
   auth,
   controller.dashboard
);

// =====================================
// PROFIT REPORT
// =====================================

router.get(
   "/profit",
   auth,
   controller.profitReport
);

module.exports = router;