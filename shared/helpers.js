exports.formatCurrency =
(amount)=>{

   return Number(amount)
   .toLocaleString();

};

exports.calculateProfit =
(revenue,expenses)=>{

   return revenue - expenses;

};

exports.generateReference =
()=>{

   return `REF-${Date.now()}`;

};