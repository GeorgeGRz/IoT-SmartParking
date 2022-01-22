import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import express from "express";
// import cors from "cors";
// import mongoose from "mongoose";

ReactDOM.render(<App />, document.getElementById('root'));

// const app = express();
// app.use(express.json());
// app.use(express.urlencoded());
// app.use(cors());


// mongoose.connect("mongodb://localhost:27017/auth",{
//     useNewUrlParser:true,
//     useUnifiedTopology:true
// });()=>{
//     console.log("connected to DB")
// }

// //user schema 
// const userSchema = new mongoose.Schema({
//     name: String,
//     email: String,
//     password: String
// })

// const User = new mongoose.model("User", userSchema)

// //routes routes
// app.post("/Login",(req,res)=>{
//     const {email,password} =req.body;
//     User.findone({email:email},(err,user)=>{
//         if(user){
//            if(password === user.password){
//                res.send({message:"login sucess",user:user})
//            }else{
//                res.send({message:"wrong credentials"})
//            }
//         }else{
//             res.send("not register")
//         }
//     })
// });

// app.listen(6969,()=>{
//     console.log("started")
// })