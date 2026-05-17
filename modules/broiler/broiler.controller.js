const firestore =
require('../../config/firestore');

exports.createRecord =
async(req,res)=>{

   const data = req.body;

   await firestore
   .collection('broiler')
   .add({

      ...data,
      userId:req.user.id,
      createdAt:new Date()

   });

   res.json({
      success:true
   });

};

exports.getRecords =
async(req,res)=>{

   const snapshot =
   await firestore
   .collection('broiler')
   .where(
      'userId',
      '==',
      req.user.id
   )
   .get();

   const records = [];

   snapshot.forEach(doc=>{

      records.push({

         id:doc.id,
         ...doc.data()

      });

   });

   res.json(records);

};