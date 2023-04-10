import {Column, Entity, ManyToOne, PrimaryGeneratedColumn,} from "typeorm";
import {TodoStatus} from "../model/todo.model";
import {Special} from "../../common/special";
import {User} from "../../user/entities/user.entity";

@Entity("todo")
export class TodoEntity extends Special{

    @PrimaryGeneratedColumn()
    id : number

    @Column()
    name : string

    @Column()
    description : string

    @Column({
        type : "enum",
        enum : TodoStatus,
        default : TodoStatus.waiting
    })
    statut : string



}