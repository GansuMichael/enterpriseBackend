const model =
require("./layers.model");

exports.createRecord =
async(data,user)=>{

   return await model.create({
      ...data,
      userId:user.id
   });

};

exports.getRecords =
async(user)=>{

   return await model.findAll(
      user.id
   );

};

exports.getSingleRecord =
async(id)=>{

   return await model.findById(id);

};

exports.updateRecord =
async(id,data)=>{

   return await model.update(
      id,
      data
   );

};

exports.deleteRecord =
async(id)=>{

   return await model.remove(id);

};

exports.getAnalytics =
async(user)=>{

   const records =
   await model.findAll(user.id);

   let eggs = 0;

   records.forEach(item=>{

      eggs += item.eggs || 0;

   });

   return {

      totalEggs:eggs

   };

};