import mongoose, { Schema, model } from "mongoose";

const taskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  priority: { 
    type: String, 
    enum: ['general', 'important'],
    required: true 
  }, 
  status: { 
    type: String, 
    enum: ['pending', 'completed', 'expired'],
    default: 'pending'
  },
  image: { type: String, required: false },
  onCreateAt: { 
    type: Date, 
    default: Date.now 
  },
  dueDate: { 
    type: Date, 
    required: true 
  },
  userId:{
    type:Schema.Types.ObjectId,
    ref:"User",
    require:true
  }
});


const Task = model('Task', taskSchema);

export default Task;
