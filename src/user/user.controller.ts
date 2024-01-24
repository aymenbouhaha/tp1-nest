import { Controller, Post, Body} from '@nestjs/common';
import { UserService } from './user.service';
import {SignUpDto} from "./dto/sign-up.dto";
import {LoginDto} from "./dto/login.dto";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("sign-up")
  signUp(@Body() signUpDto: SignUpDto) {
    return this.userService.signUp(signUpDto);
  }

  @Post("login")
  login(@Body() loginDto : LoginDto){
    return this.userService.login(loginDto)
  }


}
