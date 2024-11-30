import { Request, Response } from "express";
import User from "../models/user.model";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {Env} from "../config/envVariable"

export const registerUser=async(req:Request,res:Response): Promise<void> =>{
  try {
    const {email,password}=req.body;
    const Email= await User.findOne({email:email});
    if(Email){
        res.status(StatusCodes.BAD_REQUEST)
        .json({
          status:false,
          message:"This email already exists",
          data:""
        })
        return;
    }
    const hashpassword=await bcrypt.hash(password,10);
    const user=new User({email,password:hashpassword});
    await user.save();
    
    res.status(StatusCodes.CREATED)
      .json({
        status:true,
        message:"Successfully register",
        data:user
     })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
          status:false,
          message:"something went wrong"
        })
  }
}

const loginUser=async(req:Request,res:Response):Promise<void> =>{
  try {
    const {email,password}=req.body;
    
    const userByemail= await User.findOne({email:email});
    if(!userByemail){
      res.status(StatusCodes.UNAUTHORIZED)
        .json({
          status:false,
          message:"invalid credentials",
          
        })
        return;
    }
    const isMatchPassword=await bcrypt.compare(password,userByemail.password);
    if(!isMatchPassword){
      res.status(StatusCodes.UNAUTHORIZED)
        .json({
          status:false,
          message:"invalid credentials",
          
        })
      return;
    }
    const payload={
      id:userByemail._id,
      email:userByemail.email
    }
    const token=jwt.sign(payload,Env.SECRET_KEY!,{expiresIn:'1d'});
    
    res.status(StatusCodes.CREATED)
      .json({
        status:true,
        message:"Successfully login",
        acesstoken:token
     })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
          status:false,
          message:"something went wrong"
        })
  }
}

export const userController={
  registerUser,
  loginUser
}