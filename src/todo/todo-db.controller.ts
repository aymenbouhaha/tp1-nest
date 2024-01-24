import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards} from '@nestjs/common';
import {AddTodoDto} from "./dto/add-todo.dto";
import {UpdateTodoDto} from "./dto/update-todo.dto";
import {TodoDbService} from "./todo-db.service";
import {SearchDto} from "./dto/search.dto";
import {User} from "../decorator/user.decorator";
import {JwtAuthGuard} from "../user/guards/jwt-auth.guard";

@Controller({
    path: 'todo',
    version : '2'
})
@UseGuards(JwtAuthGuard)
export class TodoDbController {

    constructor(
        private todoService : TodoDbService
    ) {
    }


    @Get()
    getTodos(@Query() searchCriteria : SearchDto,@User() user){
        console.log(searchCriteria)
        return this.todoService.getTodos(user,searchCriteria)
    }

    @Get("count-for-status")
    countForStatus(@User() user){
        return this.todoService.countForStatus(user)
    }


    @Get('/:id')
    getTodoById(@Param("id", ParseIntPipe) id : number){
        return this.todoService.getTodoById(id)
    }

    @Post("add")
    addTodo(@Body() todoToAdd : AddTodoDto,@User() user){
        return this.todoService.addTodo(user,todoToAdd)
    }

    @Delete("delete/:id")
    deleteTodo(@Param("id", ParseIntPipe) id : number){
        return this.todoService.deleteTodoById(id)
    }

    @Delete("delete-soft/:id")
    deleteSoftTodo(@Param("id", ParseIntPipe) id : number){
        return this.todoService.deleteSoftTodoById(id)
    }

    @Patch("restore/:id")
    restore(@Param("id", ParseIntPipe) id : number){
        return this.todoService.restoreDeletedTodo(id)
    }

    @Patch("update/:id")
    updateTodo(@Body() todo : UpdateTodoDto, @Param("id", ParseIntPipe) id : number){
        return this.todoService.updateTodo(id,todo)
    }
}
