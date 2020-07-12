import { Module, MiddlewareConsumer, RequestMethod } from "@nestjs/common";
import { TaskContraller } from "./task.controller";
import { TaskService } from "./task.service";
import { MongooseModule } from "@nestjs/mongoose";
import { TaskSchema } from "./task.model";
import { UserSchema } from "../user/user.model";
import { AuthModule } from "src/auth/auth.module";
import { AuthMiddleware } from '../service/auth.middleware';
import { UserService } from "src/user/user.service";
import { UserModule } from "src/user/user.module";

@Module({
    imports:[
        AuthModule,
        UserModule,
        MongooseModule.forFeature([{name: 'Task', schema: TaskSchema},{name: 'User', schema: UserSchema}])],
    controllers:[TaskContraller],
    providers:[TaskService,UserService]
})
export class TaskModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
          .apply(AuthMiddleware)
          .forRoutes(
              { path: 'task', method: RequestMethod.GET },
              { path: 'task', method: RequestMethod.POST },
              { path: 'task', method: RequestMethod.PUT },
              { path: 'task', method: RequestMethod.DELETE });
      }
}