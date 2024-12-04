import { Request, Response } from "express";
import { AuthenticatedRequest } from "../types/types";
import Task from "../models/task.model";
import { StatusCodes } from "http-status-codes";

export const createTask = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { title, description, priority, dueDate, image } = req.body;

    const newTask = new Task({
      title,
      description,
      priority,
      image,
      dueDate,
      userId:req.user?.id
    });

    const savedTask = await newTask.save();
    res.status(StatusCodes.CREATED).json({ 
      status:true,
      message: "Task created successfully",
      data: savedTask });
  } catch (error: any) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status:false, 
      message: "Error creating task", 
      error: error.message });
  }
};

