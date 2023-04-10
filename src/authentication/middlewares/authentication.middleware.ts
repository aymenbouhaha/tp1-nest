import {Injectable, NestMiddleware, UnauthorizedException} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import {verify} from 'jsonwebtoken';
import {config} from "dotenv";


config()
@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"]
    if (authHeader){
      const token = authHeader.split(' ')[1];
      try {
        const decoded = verify(token,process.env["SECRET"])
        req["user"]=decoded;
      }catch (e) {
          throw new UnauthorizedException("Invalid token")
      }
    }
    else {
      throw new UnauthorizedException()
    }
    next();
  }
}
