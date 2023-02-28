import {IsIn, IsOptional} from "class-validator";
import {TodoStatus} from "../model/todo.model";
import {statusErrorMessage} from "../../common/constants";

export class SearchDto{

    @IsOptional()
    critere : string

    @IsOptional()
    @IsIn([TodoStatus.waiting,TodoStatus.actif,TodoStatus.done],{
        message : statusErrorMessage
    })
    statut : string
}