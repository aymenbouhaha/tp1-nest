import { TodoEntity } from "src/todo/entity/todo.entity";
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";


@Entity("user")
export class User {

    @PrimaryGeneratedColumn()
    id : number


    @Column()
    email : string

    @Column()
    password : string

    @Column()
    salt : string

    @OneToMany(
        ()=>TodoEntity,
        (todo)=> todo.user
    )
    todos : TodoEntity[]


}

