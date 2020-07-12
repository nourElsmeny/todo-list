import { Injectable,NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { uuid } from 'uuidv4';
import {User} from "./user.model";
import { AuthService } from "src/auth/auth/auth.service";
import  _ = require("lodash");
// import { AuthService } from '../auth/auth.service';
@Injectable()
export class UserService{
    public Users: User[] = [];

    constructor(
        @InjectModel("User") private readonly userModel : Model<User>,
        private authService: AuthService){}

    async signup(userName: string, password: string, firstName: string, lastName: string, mobileNumber: number, email: string) {
        
       
        const user = {
            userId:'', 
            userName, 
            password, 
             userToken:'',
             firstName,
             lastName,
             mobileNumber,
             email,
             islogin:0
        };
        
        
       //generate the secure data 
       user.password =  await this.authService.hashPassword(password)
        user.userId = uuid();
        user.userToken = await this.authService.generateJWT(user);
        //------------------------------
       
        const newUser = new this.userModel(user);

        const findUser =  await this.userModel.findOne({userName : userName}).exec();
        if(findUser)
        return {statusCode:404,message:"this username is already exist, please choose another!"} ;
        
        newUser.isLogin = false

        const userRes = await newUser.save();

        if(userRes)
        return {statusCode:200,message:"success registration user",data:userRes} as object;
        else
        throw new NotFoundException("cannot create this user!") as object;
    }

    async allUsers(page){
        const skip = page * 10
        const count = await this.userModel.count().exec();
        const allUsers = await this.userModel.find().limit(10).skip(skip).exec();
        if(!allUsers)
        throw new NotFoundException("no users found!");

        return {statusCode : 200 , message:"success",data :{count :count,page:page, users : allUsers}};
    }


    async getUser(userId: string){
        const userData =  await this.userModel.findOne({userId : userId}).exec();
        if(!userData)
        throw new NotFoundException("cannot find this user!");
        return {statusCode : 200 , message:"success",data :userData}

    }
    async getUserByFilter(userFilter: object){
        const userData =  await this.userModel.findOne(userFilter).exec();
        
        return userData

    }
    async login(userName: string, password: string){
        const userData =  await this.userModel.findOne({userName : userName}).exec();
        if(!userData)
        return {statusCode:404,message:"you must sgin up first !"} ;
        
        
        const  comparing= await this.authService.comparePassword(password, userData.password);
        if(!comparing)
        return {statusCode:404,message:"you must sgin up first !"} ;


        const user = {
            userId:userData.userId, 
            userName:userData.userName, 
            password:userData.password, 
             userToken:userData.userToken,
             firstName:userData.firstName,
             lastName:userData.lastName,
             mobileNumber:userData.mobileNumber,
             email:userData.email
        };
        const userToken = await this.authService.generateJWT(user);
        

        const updatedData = await this.userModel.updateOne({ userId: userData.userId}, { $set: { isLogin: true ,userToken: userToken }},{new:true});

        if(_.isNil(updatedData))
        return {statusCode:404,message:"Ooops, somthing went wrong, try again..."} ;

        return {statusCode : 200 , message:"success",data :{userToken :userToken}};
    }
}