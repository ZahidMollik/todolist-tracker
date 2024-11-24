import express from "express";
import {env} from "./config/envVariable";
import {connectDB} from "./config/db"
const app=express();


const PORT= env.PORT ;
connectDB();
app.listen(PORT,()=>{
  console.log(`Server Running on ${PORT}`);
})