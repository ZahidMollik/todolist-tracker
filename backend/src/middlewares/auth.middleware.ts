import {Request,Response,NextFunction } from "express";
import { AuthenticatedRequest } from "../types/types";
import { StatusCodes } from "http-status-codes";
import {Env} from "../config/envVariable";
import jwt from "jsonwebtoken";
export const checkAuth=async(req:AuthenticatedRequest,res:Response,next:NextFunction):Promise<void>=>{
  const token=req.headers.authorization?req.headers.authorization.split(' ')[1]:null;
  if(!token){
    res.status(StatusCodes.BAD_REQUEST)
        .json({
            status:false,
            message:"Access denied"
          })
    return;
  }
  let decodeUser;
  try {
     decodeUser= await jwt.verify(token,Env.SECRET_KEY!);
     req.user=decodeUser;
     next();
  } catch (error) {
    res.status(StatusCodes.FORBIDDEN)
    .json({
      status:false,
      message:"Access denied"
    })

  }
}

