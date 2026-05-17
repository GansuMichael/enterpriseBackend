const firestore =
require("../../config/firestore");

const salesCollection =
firestore.collection(
   "finance_sales"
);

const expensesCollection =
firestore.collection(
   "finance_expenses"
);

// =====================================
// CREATE SALE
// =====================================

exports.createSale =
async(data)=>{

   const doc =
   await salesCollection
   .add(data);

   return {

      id:doc.id,

      ...data

   };

};

// =====================================
// GET SALES
// =====================================

exports.getSales =
async(userId)=>{

   const snapshot =
   await salesCollection
   .where(
      "userId",
      "==",
      userId
   )
   .get();

   const records = [];

   snapshot.forEach(doc=>{

      records.push({

         id:doc.id,

         ...doc.data()

      });

   });

   return records;

};

// =====================================
// CREATE EXPENSE
// =====================================

exports.createExpense =
async(data)=>{

   const doc =
   await expensesCollection
   .add(data);

   return {

      id:doc.id,

      ...data

   };

};

// =====================================
// GET EXPENSES
// =====================================

exports.getExpenses =
async(userId)=>{

   const snapshot =
   await expensesCollection
   .where(
      "userId",
      "==",
      userId
   )
   .get();

   const records = [];

   snapshot.forEach(doc=>{

      records.push({

         id:doc.id,

         ...doc.data()

      });

   });

   return records;

};