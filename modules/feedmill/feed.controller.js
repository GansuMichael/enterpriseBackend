const service =
require("./feed.service");

exports.createFeed =
async(req,res)=>{

   const data =
   await service.createFeed(
      req.body,
      req.user
   );

   res.json(data);

};

exports.getFeeds =
async(req,res)=>{

   const data =
   await service.getFeeds(
      req.user
   );

   res.json(data);

};

exports.updateFeed =
async(req,res)=>{

   const data =
   await service.updateFeed(
      req.params.id,
      req.body
   );

   res.json(data);

};

exports.deleteFeed =
async(req,res)=>{

   await service.deleteFeed(
      req.params.id
   );

   res.json({
      success:true
   });

};