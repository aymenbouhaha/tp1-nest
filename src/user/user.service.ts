import {BadRequestException, ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {SignUpDto} from "./dto/sign-up.dto";
import * as bcrypt from 'bcrypt';
import {LoginDto} from "./dto/login.dto";
import {JwtService} from "@nestjs/jwt";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {Repository} from "typeorm";


@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService : JwtService,
    ) {
    }


    // async signUp(signUpDto : SignUpDto){
    //     const salt = await bcrypt.genSalt();
    //     const password = await bcrypt.hash(signUpDto.password,salt)
    //     const user=new this.userModel({
    //         ...signUpDto,
    //         password : password,
    //         salt : salt,
    //     })
    //     try {
    //         return await user.save()
    //     }catch (e) {
    //         throw e
    //     }
    // }

    async signUp(userData : SignUpDto){
        const user=this.userRepository.create(
            {
                ...userData
            }
        )
        user.salt= await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password,user.salt)
        try {
            await this.userRepository.save(user)
        }catch (e){
            throw new ConflictException("Une erreur est survenue veuillez réessayer")
        }
        return {
            id : user.id,
            email : user.email,
        }

    }

    async login(credentials : LoginDto){
        const {email, password} = credentials;
        const user = await this.userRepository.findOne({where : {email : email} })
        if (!user) {
            throw new NotFoundException(`l'email ou le mot de passe sont incorrecte`)
        }
        const hashedPassword = await bcrypt.hash(password, user.salt)
        if (hashedPassword == user.password) {
            const payload = {
                id : user.id,
                email: user.email,
            }
            const token = this.jwtService.sign(payload)

            return {
                ...payload,
                token: token,
            };
        } else {
            throw new NotFoundException(`l'email ou le mot de passe sont incorrecte`);
        }
    }


    async findUserByMail(email: string) {
        return this.userRepository.findOne({where : {email : email} })
    }
}
