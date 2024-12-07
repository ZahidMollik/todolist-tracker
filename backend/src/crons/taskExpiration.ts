import cron from "node-cron";
import Task from "../models/task.model";

const updateExpiredTasks = async () => {
  try {
    const result = await Task.updateMany(
      { dueDate: { $lt: new Date() }, status: 'Pending' },
      { $set: { status: 'Expired' } }
    );
    console.log(`${result.modifiedCount} tasks marked as expired.`);
  } catch (error) {
    console.error('Error updating expired tasks:', error);
  }
};

cron.schedule('0 * * * *', () => {
  console.log('Running expiration check...');
  updateExpiredTasks();
});

export default updateExpiredTasks; 
