import express from "express";
import {Env} from "./config/envVariable";
import {connectDB} from "./config/db";
import cors from "cors";
import apiRoutes from "./routes";

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());
const PORT= Env.PORT ;
connectDB();
app.use('/api',apiRoutes);
app.listen(PORT,()=>{
  console.log(`Server Running on ${PORT}`);
})