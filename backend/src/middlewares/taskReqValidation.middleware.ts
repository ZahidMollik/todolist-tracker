import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
const taskReqValidation = (req: Request, res: Response, next: NextFunction): void => {
  
  const { title, description, priority, dueDate } = req.body;
    if (!title) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: "title is required" });
      return;
    }
    if (!description) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: "description is required" });
      return;
    }
   
    if (!priority) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: "priority is required" });
      return;
    }
    if (!dueDate) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: "dueDate is required" });
      return;
    }
    if (new Date(dueDate) <= new Date()) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "dueDate must be greater than today's date" });
      return;
    }
    
    next();
};

export default taskReqValidation;