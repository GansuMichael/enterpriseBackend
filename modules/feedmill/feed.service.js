const model =
require("./feed.model");

exports.createFeed =
async(data,user)=>{

   return await model.create({
      ...data,
      userId:user.id
   });

};

exports.getFeeds =
async(user)=>{

   return await model.findAll(
      user.id
   );

};

exports.updateFeed =
async(id,data)=>{

   return await model.update(
      id,
      data
   );

};

exports.deleteFeed =
async(id)=>{

   return await model.remove(id);

};