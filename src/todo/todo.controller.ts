import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post} from '@nestjs/common';
import {TodoService} from "./todo.service";
import {AddTodoDto} from "./dto/add-todo.dto";
import {UpdateTodoDto} from "./dto/update-todo.dto";

@Controller({
    path: 'todo',
    version: '1'
})
export class TodoController {

    constructor(
        private todoService : TodoService
    ) {
    }


    @Get()
    getTodos(){
        return this.todoService.getTodos()
    }


    @Get('/:id')
    getTodoById(@Param("id") id : string){
        return this.todoService.getTodoById(id)
    }

    @Post("add")
    addTodo(@Body() todoToAdd : AddTodoDto){
        return this.todoService.addTodo(todoToAdd)
    }

    @Delete("delete/:id")
    deleteTodo(@Param("id") id : string){
        return this.todoService.deleteTodoById(id)
    }


    @Patch("update/:id")
    updateTodo(@Body() todo : UpdateTodoDto, @Param("id") id : string){
        return this.todoService.updateTodo(id,todo)
    }



}
