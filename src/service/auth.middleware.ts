import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from '../user/user.service'
@Injectable()
export class AuthMiddleware implements NestMiddleware {

  constructor(private readonly userService: UserService) {}
  async use(req: Request, res: Response, next: Function) {
    if(req.method == 'GET'){
      if(!req.query.token){
        return res.send({statusCode:401,message:"You dont have authority to access this page"});
      }else{
        const token = await this.userService.getUserByFilter({'userToken': req.query.token});
        delete req.query.token;
        req["userData"] = token;
    next();
      }
    }else if(req.method == "POST" || req.method == "PUT" || req.method == "DELETE" ){
      if(!req.body.token){
        return res.send({statusCode:401,message:"You dont have authority to access this page"});
      }else{
        const token = await this.userService.getUserByFilter({'userToken': req.body.token});
       
        req["userData"] = token;
    next();
      }
    }
  }
}
