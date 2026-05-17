const model =
require("./finance.model");

// =====================================
// CREATE SALE
// =====================================

exports.createSale =
async(data,user)=>{

   return await model.createSale({

      ...data,

      userId:user.id,

      createdAt:new Date()

   });

};

// =====================================
// GET SALES
// =====================================

exports.getSales =
async(user)=>{

   return await model.getSales(
      user.id
   );

};

// =====================================
// CREATE EXPENSE
// =====================================

exports.createExpense =
async(data,user)=>{

   return await model.createExpense({

      ...data,

      userId:user.id,

      createdAt:new Date()

   });

};

// =====================================
// GET EXPENSES
// =====================================

exports.getExpenses =
async(user)=>{

   return await model.getExpenses(
      user.id
   );

};

// =====================================
// DASHBOARD
// =====================================

exports.dashboard =
async(user)=>{

   const sales =
   await model.getSales(
      user.id
   );

   const expenses =
   await model.getExpenses(
      user.id
   );

   let totalSales = 0;
   let totalExpenses = 0;

   sales.forEach(item=>{

      totalSales +=
      item.amount || 0;

   });

   expenses.forEach(item=>{

      totalExpenses +=
      item.amount || 0;

   });

   return {

      totalSales,

      totalExpenses,

      profit:
      totalSales -
      totalExpenses

   };

};

// =====================================
// PROFIT REPORT
// =====================================

exports.profitReport =
async(user)=>{

   const dashboard =
   await exports.dashboard(
      user
   );

   return {

      ...dashboard,

      status:
      dashboard.profit > 0
      ? "Profitable"
      : "Loss"

   };

};