const service =
require("./finance.service");

// =====================================
// CREATE SALE
// =====================================

exports.createSale =
async(req,res)=>{

   const data =
   await service.createSale(
      req.body,
      req.user
   );

   res.json(data);

};

// =====================================
// GET SALES
// =====================================

exports.getSales =
async(req,res)=>{

   const data =
   await service.getSales(
      req.user
   );

   res.json(data);

};

// =====================================
// CREATE EXPENSE
// =====================================

exports.createExpense =
async(req,res)=>{

   const data =
   await service.createExpense(
      req.body,
      req.user
   );

   res.json(data);

};

// =====================================
// GET EXPENSES
// =====================================

exports.getExpenses =
async(req,res)=>{

   const data =
   await service.getExpenses(
      req.user
   );

   res.json(data);

};

// =====================================
// DASHBOARD
// =====================================

exports.dashboard =
async(req,res)=>{

   const data =
   await service.dashboard(
      req.user
   );

   res.json(data);

};

// =====================================
// PROFIT REPORT
// =====================================

exports.profitReport =
async(req,res)=>{

   const data =
   await service.profitReport(
      req.user
   );

   res.json(data);

};