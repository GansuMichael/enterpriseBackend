// ========================================
// FILE UPLOAD MIDDLEWARE
// ========================================

const multer =
require("multer");

const path =
require("path");

// ========================================
// STORAGE CONFIG
// ========================================

const storage =
multer.diskStorage({

   destination:
   function(
      req,
      file,
      cb
   ){

      cb(
         null,
         "uploads/"
      );

   },

   filename:
   function(
      req,
      file,
      cb
   ){

      const uniqueName =

         Date.now() +

         "-" +

         Math.round(
            Math.random() * 1E9
         ) +

         path.extname(
            file.originalname
         );

      cb(
         null,
         uniqueName
      );

   }

});

// ========================================
// FILE FILTER
// ========================================

const fileFilter =
(
   req,
   file,
   cb
) => {

   const allowedTypes =

   [

      "image/jpeg",

      "image/png",

      "image/jpg",

      "application/pdf"

   ];

   if(

      allowedTypes.includes(
         file.mimetype
      )

   ){

      cb(
         null,
         true
      );

   } else {

      cb(

         new Error(
            "Invalid file type"
         ),

         false

      );

   }

};

// ========================================
// MULTER CONFIG
// ========================================

const upload =
multer({

   storage,

   fileFilter,

   limits: {

      fileSize:
      5 * 1024 * 1024

   }

});

// ========================================
// EXPORT
// ========================================

module.exports =
upload;