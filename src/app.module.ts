import { Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [UserModule,TaskModule, MongooseModule.forRoot('mongodb+srv://todoListUser:ToDoList1991@cluster0.1lltq.mongodb.net/toDoDatabase?retryWrites=true&w=majority'), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
 
}
