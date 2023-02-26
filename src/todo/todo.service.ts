import {Inject, Injectable, NotFoundException} from '@nestjs/common';
import {TodoModel, TodoStatus} from "./model/todo.model";
import {AddTodoDto} from "./dto/add-todo.dto";
import {UpdateTodoDto} from "./dto/update-todo.dto";

@Injectable()
export class TodoService {
    private todos : TodoModel[] = [
        {
            "id": "58c10e5d-b8aa-47bc-8cdf-9cbd0b96f333",
            "name": "todo1",
            "description": "desc for todo",
            "dateCreation": new Date(),
            "statut": TodoStatus.waiting
        },
        {
            "id": "78183963-8eb3-4799-b125-6b34f084caef",
            "name": "todo2",
            "description": "desc for todo",
            "dateCreation": new Date(),
            "statut": TodoStatus.waiting
        },
        {
            "id": "f8689e03-5986-4a60-a3d5-be1f80472bf6",
            "name": "todo3",
            "description": "desc for todo",
            "dateCreation": new Date(),
            "statut": TodoStatus.waiting
        }
    ]

    @Inject('UUID') uuid : ()=> string


    getTodos(){
        return this.todos
    }

    addTodo(todoToAdd : AddTodoDto){
        const newTodo : TodoModel= new TodoModel()
        newTodo.id=this.uuid()
        newTodo.name=todoToAdd.name
        newTodo.description=todoToAdd.description
        newTodo.dateCreation=new Date()
        newTodo.statut=TodoStatus.waiting
        this.todos.push(newTodo)
        return this.todos
    }

    getTodoById(id : string){
        const todo=this.todos.find(
            (todo)=>{
                return todo.id=== id
            }
        )
        if (!todo){
            throw new NotFoundException()
        }
        return todo
    }

    deleteTodoById(id : string){
        const todoIndex = this.todos.findIndex(
            (todo)=>{
                return todo.id===id
            }
        )
        console.log(todoIndex)
        if (todoIndex===-1){
            throw new NotFoundException()
        }
        return this.todos.splice(todoIndex,1)
    }

    updateTodo(id : string, todoUpdates : UpdateTodoDto){
        const todoIndex = this.todos.findIndex(
            (todo)=>{
                return todo.id===id
            }
        )
        if (todoIndex===-1){
            throw new NotFoundException()
        }
        this.todos[todoIndex].name=todoUpdates.name ?? this.todos[todoIndex].name
        this.todos[todoIndex].description=todoUpdates.description ?? this.todos[todoIndex].description
        this.todos[todoIndex].statut=todoUpdates.statut ?? this.todos[todoIndex].statut
        return this.todos[todoIndex]
    }


}
