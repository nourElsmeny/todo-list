import { Module } from "@nestjs/common";
import { UserContraller } from "./user.controller";
import { UserService } from "./user.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "./user.model";
import { AuthModule } from "src/auth/auth.module";

@Module({
    imports:[
        AuthModule,
        MongooseModule.forFeature([{name: 'User', schema: UserSchema}])],
    controllers:[UserContraller],
    providers:[UserService]
})
export class UserModule {}