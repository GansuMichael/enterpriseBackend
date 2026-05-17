const service =
require("./inventory.service");

exports.createItem =
async(req,res)=>{

   const data =
   await service.createItem(
      req.body,
      req.user
   );

   res.json(data);

};

exports.getItems =
async(req,res)=>{

   const data =
   await service.getItems(
      req.user
   );

   res.json(data);

};

exports.updateItem =
async(req,res)=>{

   const data =
   await service.updateItem(
      req.params.id,
      req.body
   );

   res.json(data);

};

exports.deleteItem =
async(req,res)=>{

   await service.deleteItem(
      req.params.id
   );

   res.json({
      success:true
   });

};