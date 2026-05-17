// ========================================
// GLOBAL ERROR HANDLER
// ========================================

module.exports =
(
   err,
   req,
   res,
   next
) => {

   console.error(
      "ERROR:",
      err
   );

   // =====================================
   // MULTER ERRORS
   // =====================================

   if(

      err.code ===
      "LIMIT_FILE_SIZE"

   ){

      return res
      .status(400)
      .json({

         success: false,

         message:
         "File too large"

      });

   }

   // =====================================
   // CUSTOM ERROR
   // =====================================

   if(err.message){

      return res
      .status(400)
      .json({

         success: false,

         message:
         err.message

      });

   }

   // =====================================
   // DEFAULT ERROR
   // =====================================

   return res
   .status(500)
   .json({

      success: false,

      message:
      "Internal server error"

   });

};