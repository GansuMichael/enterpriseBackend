const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const pool =
require('../../config/postgres');

exports.register =
async(req,res)=>{

   const {
      name,
      email,
      password
   } = req.body;

   const hashed =
   await bcrypt.hash(password,10);

   await pool.query(

      `INSERT INTO users
      (name,email,password)
      VALUES($1,$2,$3)`,

      [name,email,hashed]

   );

   res.json({
      success:true
   });

};

exports.login =
async(req,res)=>{

   const {
      email,
      password
   } = req.body;

   const result =
   await pool.query(

      'SELECT * FROM users WHERE email=$1',

      [email]

   );

   const user =
   result.rows[0];

   if(!user){

      return res.status(401)
      .json({
         message:'User not found'
      });

   }

   const valid =
   await bcrypt.compare(
      password,
      user.password
   );

   if(!valid){

      return res.status(401)
      .json({
         message:'Wrong password'
      });

   }

   const token =
   jwt.sign(

      {
         id:user.id,
         email:user.email
      },

      process.env.JWT_SECRET,

      {
         expiresIn:'7d'
      }

   );

   res.json({

      token,

      user:{
         id:user.id,
         name:user.name,
         email:user.email
      }

   });

};