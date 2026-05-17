const service =
require("./analytics.service");

exports.dashboard =
async(req,res)=>{

   const data =
   await service.dashboard(
      req.user
   );

   res.json(data);

};