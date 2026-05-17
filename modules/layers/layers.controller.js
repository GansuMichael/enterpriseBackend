const service =
require("./layers.service");

exports.createRecord =
async(req,res)=>{

   try{

      const data =
      await service.createRecord(
         req.body,
         req.user
      );

      res.json(data);

   }catch(error){

      res.status(500).json({
         error:error.message
      });

   }

};

exports.getRecords =
async(req,res)=>{

   const data =
   await service.getRecords(
      req.user
   );

   res.json(data);

};

exports.getSingleRecord =
async(req,res)=>{

   const data =
   await service.getSingleRecord(
      req.params.id
   );

   res.json(data);

};

exports.updateRecord =
async(req,res)=>{

   const data =
   await service.updateRecord(
      req.params.id,
      req.body
   );

   res.json(data);

};

exports.deleteRecord =
async(req,res)=>{

   await service.deleteRecord(
      req.params.id
   );

   res.json({
      success:true
   });

};

exports.getAnalytics =
async(req,res)=>{

   const data =
   await service.getAnalytics(
      req.user
   );

   res.json(data);

};