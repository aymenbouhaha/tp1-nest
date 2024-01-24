import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import {UserService} from "../user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private config : ConfigService,
        private userService : UserService,

    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.get('SECRET'),
        });
    }

    async validate(payload: {email : string , name : string}) {
        const user = await this.userService.findUserByMail(payload.email)
        if (!user){
            throw new UnauthorizedException()
        }
        delete user.password
        delete user.salt
        return user
    }
}
