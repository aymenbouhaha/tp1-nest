import {IsEmail, IsNotEmpty, IsString} from "class-validator";

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    username : string


    @IsNotEmpty()
    @IsEmail()
    email : string

    @IsString()
    @IsNotEmpty()
    password : string
}
