const model =
require("./inventory.model");

exports.createItem =
async(data,user)=>{

   return await model.create({
      ...data,
      userId:user.id
   });

};

exports.getItems =
async(user)=>{

   return await model.findAll(
      user.id
   );

};

exports.updateItem =
async(id,data)=>{

   return await model.update(
      id,
      data
   );

};

exports.deleteItem =
async(id)=>{

   return await model.remove(id);

};