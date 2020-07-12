import {Controller, Post, Body, Get, Param, Query, Request, Put, Delete} from '@nestjs/common';
import { TaskService } from './task.service';
@Controller('task')
export class TaskContraller {
  constructor(private readonly taskService: TaskService) {}
  @Post()
  async addTask(
    @Request() user:object,
    @Body('taskTitle') taskTitle: string,
    @Body('taskDiscription') taskDiscription: string,
    @Body('doData') doData: string,
    @Body('orderNum') orderNum: number,
    @Body('isDone') isDone: boolean,
    @Body('isDeleted') isDeleted: boolean,
  ) {
    return (await this.taskService.addTask(
      user,
      taskTitle,
      taskDiscription,
      doData,
      orderNum,
      isDone,
      isDeleted,
    )) as object;
  }
 
  @Get()
  allTasks( @Request() user:object,@Query('page') page: string,@Query('id') taskId: string): object {
    return this.taskService.allTasks(user,page, taskId);
  }

  @Put()
  async updateTask( 
    @Request() user:object,
  @Body('taskId') taskId: string,
  @Body('taskTitle') taskTitle: string,
  @Body('taskDiscription') taskDiscription: string,
  @Body('doData') doData: string,
  @Body('orderNum') orderNum: number,
  @Body('isDone') isDone: boolean,
  @Body('isDeleted') isDeleted: boolean,){
    return (await this.taskService.updateTask(
      user,
      taskId,
      taskTitle,
      taskDiscription,
      doData,
      orderNum,
      isDone,
      isDeleted,
    )) as object;
  }
 

  @Delete()
  async deleteTask(
    @Request() user:object,
  @Body('taskId') taskId: string,
  ){
    return (await this.taskService.deleteTask(
      user,
      taskId
    )) as object;
  }
}
