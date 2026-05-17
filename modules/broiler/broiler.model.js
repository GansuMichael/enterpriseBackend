const firestore =
require("../../config/firestore");

const collection =
firestore.collection(
   "broiler"
);

// =====================================
// CREATE
// =====================================

exports.create =
async(data)=>{

   const doc =
   await collection.add(data);

   return {

      id:doc.id,

      ...data

   };

};

// =====================================
// FIND ALL
// =====================================

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

// =====================================
// FIND ONE
// =====================================

exports.findById =
async(id)=>{

   const doc =
   await collection
   .doc(id)
   .get();

   return {

      id:doc.id,

      ...doc.data()

   };

};

// =====================================
// UPDATE
// =====================================

exports.update =
async(id,data)=>{

   await collection
   .doc(id)
   .update(data);

   return {

      success:true

   };

};

// =====================================
// DELETE
// =====================================

exports.remove =
async(id)=>{

   await collection
   .doc(id)
   .delete();

};