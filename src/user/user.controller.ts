import {Controller,Post,Body,Get,Param,Query} from '@nestjs/common';
import { UserService } from './user.service';
@Controller('user')
export class UserContraller {
  constructor(private readonly userService: UserService) {}
  @Post()
  async signup(
    @Body('userName') userName: string,
    @Body('password') password: string,
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('mobileNumber') mobileNumber: number,
    @Body('email') email: string,
  ) {
    return (await this.userService.signup(
      userName,
      password,
      firstName,
      lastName,
      mobileNumber,
      email,
    )) as object;
  }
  @Post('/login')
  async login(
    @Body('userName') userName: string,
    @Body('password') password: string,
  ) {
    return await this.userService.login(userName, password);
  }
  @Get('')
  users(@Query('page') page: number): object {
    return this.userService.allUsers(page);
  }

  @Get(':id')
  user(@Param('id') userId: string): object {
    return this.userService.getUser(userId);
  }

  //   @Patch(":id")
  //   updateUser(@Param('id')){

  //   }
}
