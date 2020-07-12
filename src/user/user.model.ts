import * as mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    userId: {type: String, required:true},
    userName: {type: String, required:true},
    password: {type: String, required:true},
    userToken: {type: String, required:true},
    firstName: {type: String, required:true},
    lastName: {type: String, required:true},
    mobileNumber: {type: Number, required:true},
    email: {type: String, required:true},
    isLogin: {type: Boolean, required:true}
});
export interface User{
         id:string;
         userName:string; 
         password:string; 
         userToken:string;
         firstName:string;
         lastName:string;
         mobileNumber:number;
         email:string;
         isLogin:boolean;
}