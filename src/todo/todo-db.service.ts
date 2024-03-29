import {ConflictException, Inject, Injectable, NotFoundException} from '@nestjs/common';
import {TodoModel, TodoStatus} from "./model/todo.model";
import {AddTodoDto} from "./dto/add-todo.dto";
import {UpdateTodoDto} from "./dto/update-todo.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {TodoEntity} from "./entity/todo.entity";
import {Like, Repository} from "typeorm";
import {SearchDto} from "./dto/search.dto";
import {User} from "../user/entities/user.entity";


@Injectable()
export class TodoDbService {

    constructor(
        @InjectRepository(TodoEntity)
        private todoRepostiory : Repository<TodoEntity>
    ) {
    }



    getTodos( user : User,searchCriteria? : SearchDto){
        const findOptions=[]
        if (searchCriteria)
            if (searchCriteria.critere)
            {
                findOptions.push({
                    name : Like(`%${searchCriteria.critere}%`)
                })
                findOptions.push({
                    description : Like(`%${searchCriteria.critere}%`)
                })
            }
            if (searchCriteria.statut){
                findOptions.push({
                    statut : searchCriteria.statut
                })
            }
        if (findOptions.length){
            return this.todoRepostiory.findBy(findOptions)
        }
        return this.todoRepostiory.find({where : {user : user}})
    }

    addTodo(user : User,todoToAdd : AddTodoDto){
        const newTodo = this.todoRepostiory.create({
            ...todoToAdd,
            user : user
        })
        try {
            return this.todoRepostiory.save(newTodo)
        }
        catch (e) {
            throw new ConflictException("Une erreur lors de l'ajout du todo")
        }
    }

    async getTodoById(id : number){
        const todo = await this.todoRepostiory.findOneBy({id : id})
        if (!todo){
            throw new NotFoundException()
        }
        return todo
    }

    deleteTodoById(id : number){
        return this.todoRepostiory.delete(id)
    }

    deleteSoftTodoById(id : number){
        return this.todoRepostiory.softDelete(id)
    }

    restoreDeletedTodo(id : number){
        return this.todoRepostiory.restore(id)
    }

    async countForStatus(user : User) {
        const countForWaiting = await this.todoRepostiory.count({where: {
            statut: TodoStatus.waiting,
                user : user
        }})
        const countForDone =await this.todoRepostiory.count({where: {statut: TodoStatus.done,
                user : user}})
        const countForActif =await this.todoRepostiory.count({where: {statut: TodoStatus.actif,
                user : user}})
        const counts = {
            "En Cours": countForActif,
            "En attente": countForWaiting,
            "Finalisé": countForDone
        }
        return counts
    }

    updateTodo(id : number, todoUpdates : UpdateTodoDto){
        return this.todoRepostiory.update(id,todoUpdates)
    }
}
