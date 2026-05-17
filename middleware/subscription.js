module.exports =
(req,res,next)=>{

   const subscription =
   req.user.subscription;

   if(subscription !== 'premium'){

      return res.status(403)
      .json({
         message:'Upgrade Required'
      });

   }

   next();

};