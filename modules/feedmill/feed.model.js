const firestore =
require("../../config/firestore");

const collection =
firestore.collection("feedmill");

exports.create =
async(data)=>{

   const doc =
   await collection.add(data);

   return {

      id:doc.id,
      ...data

   };

};

exports.findAll =
async(userId)=>{

   const snapshot =
   await collection
   .where(
      "userId",
      "==",
      userId
   )
   .get();

   const records = [];

   snapshot.forEach(doc=>{

      records.push({

         id:doc.id,
         ...doc.data()

      });

   });

   return records;

};

exports.update =
async(id,data)=>{

   await collection
   .doc(id)
   .update(data);

};

exports.remove =
async(id)=>{

   await collection
   .doc(id)
   .delete();

};