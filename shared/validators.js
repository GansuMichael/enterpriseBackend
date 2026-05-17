exports.validateEmail =
(email)=>{

   return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/
   .test(email);

};

exports.validateRequired =
(data)=>{

   return data !== undefined &&
   data !== null &&
   data !== "";

};