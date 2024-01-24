import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import * as dotenv from "dotenv";
import {JwtStrategy} from "./strategy/passport-jwt.strategy";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";


dotenv.config()
@Module({
  imports : [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({
      defaultStrategy : "jwt"
    }),
    JwtModule.register({
      secret : process.env.SECRET,
      signOptions : {
        expiresIn : "15d"
      }
    })
  ],
  controllers: [UserController],
  providers: [UserService,JwtStrategy]
})
export class UserModule {}
