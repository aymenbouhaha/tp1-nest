import {TodoStatus} from "../model/todo.model";
import {IsIn, IsOptional, Length, MinLength} from "class-validator";
import {descriptionErrorMessage, nameErrorMessage, statusErrorMessage} from "../../common/constants";


export class UpdateTodoDto{

    @MinLength(10,{
        message : nameErrorMessage
    })
    @IsOptional()
    name : string

    @Length(3,10,{
        message : descriptionErrorMessage
    })
    @IsOptional()
    description : string

    @IsIn([TodoStatus.waiting,TodoStatus.actif,TodoStatus.done],{
        message : statusErrorMessage
    })
    @IsOptional()
    statut : TodoStatus

}