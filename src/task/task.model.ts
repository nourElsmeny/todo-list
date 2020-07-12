import * as mongoose from 'mongoose';

export const TaskSchema = new mongoose.Schema({
    taskId: { type: String, required: true },
    userId: { type: String, required: true },
    taskTitle: { type: String, required: true },
    taskDiscription: { type: String, required: true },
    doData: { type: String, required: true },
    orderNum: { type: Number, required: true },
    isDone: { type: Boolean, required: true },
    isDeleted: { type: Boolean, required: true }
});
export interface Task {
  taskId: string;
  userId: string;
  taskTitle: string;
  taskDiscription: string;
  doData: string;
  orderNum: number;
  isDone: boolean;
  isDeleted: boolean;
}
