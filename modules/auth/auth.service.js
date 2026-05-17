const bcrypt =
require("bcryptjs");

const jwt =
require("jsonwebtoken");

const crypto =
require("crypto");

const pool =
require("../../config/postgres");

// REGISTER

exports.register =
async (data) => {

   // HASH PASSWORD

   const hashedPassword =
   await bcrypt.hash(
      data.password,
      10
   );

   // CREATE USER

   const user =
   await pool.query(

      `
      INSERT INTO users
      (name,email,password)

      VALUES ($1,$2,$3)

      RETURNING *
      `,

      [
         data.name,
         data.email,
         hashedPassword
      ]

   );

   // CREATE 7 DAYS TRIAL

   const trialEndDate =
   new Date();

   trialEndDate.setDate(
      trialEndDate.getDate() + 7
   );

   await pool.query(

      `
      INSERT INTO subscriptions
      (
         user_id,
         plan,
         status,
         expires_at
      )

      VALUES ($1,$2,$3,$4)
      `,

      [
         user.rows[0].id,

         "free_trial",

         "active",

         trialEndDate
      ]

   );

   return {

      message:
      "Registration successful"

   };

};

// LOGIN

exports.login =
async (data) => {

   const user =
   await pool.query(

      `
      SELECT * FROM users
      WHERE email = $1
      `,

      [data.email]

   );

   if(user.rows.length === 0){

      throw new Error(
         "User not found"
      );

   }

   const existingUser =
   user.rows[0];

   // CHECK PASSWORD

   const validPassword =
   await bcrypt.compare(

      data.password,

      existingUser.password

   );

   if(!validPassword){

      throw new Error(
         "Invalid credentials"
      );

   }

   // GET SUBSCRIPTION

   const subscription =
   await pool.query(

      `
      SELECT * FROM subscriptions
      WHERE user_id = $1
      `,

      [existingUser.id]

   );

   const sub =
   subscription.rows[0];

   // CHECK EXPIRY

   const now =
   new Date();

   let subscriptionStatus =
   sub.status;

   if(now > sub.expires_at){

      subscriptionStatus =
      "expired";

   }

   // CREATE TOKEN

   const token =
   jwt.sign(

      {

         userId:
         existingUser.id,

         plan:
         sub.plan,

         subscriptionStatus

      },

      process.env.JWT_SECRET,

      {
         expiresIn: "7d"
      }

   );

   return {

      token,

      user: {

         id:
         existingUser.id,

         name:
         existingUser.name,

         email:
         existingUser.email

      },

      subscription: {

         plan:
         sub.plan,

         status:
         subscriptionStatus,

         expiresAt:
         sub.expires_at

      }

   };

};

exports.forgotPassword =
async (email) => {

   // FIND USER

   const user =
   await pool.query(

      `
      SELECT * FROM users
      WHERE email = $1
      `,

      [email]

   );

   if(user.rows.length === 0){

      throw new Error(
         "User not found"
      );

   }

   // GENERATE TOKEN

   const resetToken =
   crypto.randomBytes(32)
   .toString("hex");

   // TOKEN EXPIRY

   const expiry =
   new Date(
      Date.now() +
      3600000
   );

   // SAVE TOKEN

   await pool.query(

      `
      UPDATE users

      SET
         reset_token = $1,
         reset_token_expiry = $2

      WHERE email = $3
      `,

      [
         resetToken,
         expiry,
         email
      ]

   );

   // RESET LINK

   const resetLink =

   `http://localhost:3000/pages/reset-password.html?token=${resetToken}`;

   console.log(resetLink);

   return {

      message:
      "Reset link generated"

   };

};

exports.resetPassword =
async (data) => {

   const user =
   await pool.query(

      `
      SELECT * FROM users

      WHERE reset_token = $1
      `,

      [data.token]

   );

   if(user.rows.length === 0){

      throw new Error(
         "Invalid token"
      );

   }

   const existingUser =
   user.rows[0];

   // CHECK EXPIRY

   if(
      new Date()
      >
      existingUser.reset_token_expiry
   ){

      throw new Error(
         "Token expired"
      );

   }

   // HASH NEW PASSWORD

   const hashedPassword =
   await bcrypt.hash(
      data.password,
      10
   );

   // UPDATE PASSWORD

   await pool.query(

      `
      UPDATE users

      SET
         password = $1,
         reset_token = NULL,
         reset_token_expiry = NULL

      WHERE id = $2
      `,

      [
         hashedPassword,
         existingUser.id
      ]

   );

   return {

      message:
      "Password updated"

   };

};