const model =
require("./broiler.model");

// =====================================
// CREATE RECORD
// =====================================

exports.createRecord =
async(data,user)=>{

   return await model.create({

      ...data,

      userId:user.id,

      createdAt:new Date()

   });

};

// =====================================
// GET ALL RECORDS
// =====================================

exports.getRecords =
async(user)=>{

   return await model.findAll(
      user.id
   );

};

// =====================================
// GET SINGLE RECORD
// =====================================

exports.getSingleRecord =
async(id)=>{

   return await model.findById(id);

};

// =====================================
// UPDATE RECORD
// =====================================

exports.updateRecord =
async(id,data)=>{

   return await model.update(
      id,
      data
   );

};

// =====================================
// DELETE RECORD
// =====================================

exports.deleteRecord =
async(id)=>{

   return await model.remove(id);

};

// =====================================
// ANALYTICS
// =====================================

exports.getAnalytics =
async(user)=>{

   const records =
   await model.findAll(
      user.id
   );

   let totalFeed = 0;
   let totalMortality = 0;
   let totalWeight = 0;

   records.forEach(item=>{

      totalFeed +=
      item.feed || 0;

      totalMortality +=
      item.mortality || 0;

      totalWeight +=
      item.weight || 0;

   });

   return {

      totalFeed,

      totalMortality,

      averageWeight:
      records.length
      ? totalWeight /
        records.length
      : 0

   };

};