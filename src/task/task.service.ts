import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { uuid } from 'uuidv4';
import { Task } from './task.model';
import { AuthService } from 'src/auth/auth/auth.service';
import moment = require('moment');
// import { AuthService } from '../auth/auth.service';
@Injectable()
export class TaskService {
  public Tasks: Task[] = [];

  constructor(
    @InjectModel('Task') private readonly TaskModel: Model<Task>,
    private authService: AuthService,
  ) {}

  async addTask(
    user: object,
    taskTitle: string,
    taskDiscription: string,
    doData: string,
    orderNum: number,
    isDone: boolean,
    isDeleted: boolean,
  ) {
    if (new Date(doData).toString() == 'Invalid Date')
      return {
        statusCode: 404,
        message: 'please enter valid doData',
      } as object;

    doData = moment(new Date(doData)).format('L');

    const task = {
      taskId: uuid(),
      userId: user['userData'].userId,
      taskTitle,
      taskDiscription,
      doData,
      orderNum,
      isDone: false,
      isDeleted: false,
    };

    const newTask = new this.TaskModel(task);

    const getTaskOrder = await this.TaskModel.findOne({
      doData: doData,
      userId: task.userId,
      orderNum: orderNum,
    }).exec();

    if (getTaskOrder)
      return {
        statusCode: 404,
        message: 'you have enter rowng order ',
      } as object;

    const taskRes = await newTask.save();

    if (taskRes)
      return {
        statusCode: 200,
        message: 'You create the task successfully.',
        data: taskRes,
      } as object;
    else throw new NotFoundException('cannot create this task!') as object;
  }

  async updateTask(
    user: object,
    taskId: string,
    taskTitle: string,
    taskDiscription: string,
    doData: string,
    orderNum: number,
    isDone: boolean,
    isDeleted: boolean,
  ) {
    const userId = user['userData'].userId;
    if (new Date(doData).toString() == 'Invalid Date')
      return {
        statusCode: 404,
        message: 'please enter valid doData',
      } as object;
      isDone = (/true/i).test(""+isDone);
    doData = moment(new Date(doData)).format('L');

    const taskRes = await this.TaskModel.updateOne(
      { taskId: taskId, userId: userId },
      {
        $set: {
          "taskTitle": taskTitle,
          "taskDiscription": taskDiscription,
          "doData": doData,
          "orderNum": orderNum,
          "isDone": isDone,
        },
       
      });
    if (taskRes)
      return {
        statusCode: 200,
        message: 'You update the task successfully.'
      } as object;
    else
    throw new NotFoundException('cannot update this task!') as object;
  }

  async deleteTask( user: object,
    taskId: string){
      const userId = user['userData'].userId;

      const taskRes = await this.TaskModel.updateOne(
        { taskId: taskId, userId: userId },
        {
          $set: {
            "isDeleted": true,
          },
         
        });
      if (taskRes)
        return {
          statusCode: 200,
          message: 'You deleted task successfully.'
        } as object;
  }

  async allTasks(user, page, taskId) {
    let filter: object;
    let count: string;
    const allTasks = this.TaskModel;
    let outPutData: any;
    if (!taskId) {
      const skip = page * 10;
      filter = { isDeleted: false, userId: user['userData'].userId };
      count = await this.TaskModel.countDocuments(filter).exec();
      outPutData = await allTasks
        .find(filter)
        .limit(10)
        .skip(skip)
        .sort({ order: -1 })
        .exec();
    } else {
      filter = { isDeleted: false,taskId: taskId, userId: user['userData'].userId };
      outPutData = await allTasks.findOne(filter).exec();
    }

    if (!allTasks) throw new NotFoundException('no users found!');

    return {
      statusCode: 200,
      message: 'success',
      data: { count: count, page: page, data: outPutData },
    };
  }
}
