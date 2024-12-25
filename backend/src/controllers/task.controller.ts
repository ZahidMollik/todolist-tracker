import { Request, Response } from "express";
import { AuthenticatedRequest } from "../types/types";
import Task from "../models/task.model";
import { StatusCodes } from "http-status-codes";
import fs from "fs";
import path from "path";

export const createTask = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { title, description, priority, dueDate} = req.body;
    const taskTitle= await Task.findOne({title:title});
    if(taskTitle){
      if (req.file) {
        fs.unlinkSync(path.join(__dirname, '../../uploads', req.file.filename));
      }
        res.status(StatusCodes.BAD_REQUEST)
        .json({
          status:false,
          message:"This task already exists",
          data:""
        })
        return;
    }
    const image=req.file?req.file.filename:null;

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

export const getAllTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const tasks = await Task.find();
    res.status(StatusCodes.OK).json({
      status:true,
      message: "Tasks retrieved successfully", 
      data: tasks });
  } catch (error: any) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status:false, 
      message: "Error retrieving tasks", 
      error: error.message });
  }
};

export const getTaskById = async (req: Request, res: Response): Promise<void> => {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);

    if (!task) {
      res.status(StatusCodes.NOT_FOUND).json({
        status:false, 
        message: "Task not found" });
      return;
    }

    res.status(StatusCodes.OK).json({ 
      status:true,
      message: "Task retrieved successfully", 
      data: task });
  } catch (error: any) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status:false, 
      message: "Error retrieving task", 
      error: error.message });
  }
};

export const updateTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const taskId = req.params.id;
    const updates = req.body;

    const updatedTask = await Task.findByIdAndUpdate(taskId, updates, { new: true });

    if (!updatedTask) {
      res.status(StatusCodes.NOT_FOUND).json({
        status:true,
        message: "Task not found" });
      return;
    }

    res.status(StatusCodes.OK).json({
      status:true,
      message: "Task updated successfully", data: updatedTask });
  } catch (error: any) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status:false,
      message: "Error updating task", error: error.message });
  }
};

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const taskId = req.params.id;

    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      res.status(StatusCodes.NOT_FOUND).json({
      status:false, 
      message: "Task not found" });
      return;
    }

    res.status(StatusCodes.OK).json({ 
      status:true, 
      message: "Task deleted successfully", 
      data: deletedTask });
  } catch (error: any) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status:false, 
      message: "Error deleting task", 
      error: error.message });
  }
};

