import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TodoDbController } from './todo-db.controller';
import { TodoDbService } from './todo-db.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {TodoEntity} from "./entity/todo.entity";

@Module({
  imports: [TypeOrmModule.forFeature([TodoEntity])],
  controllers: [TodoController, TodoDbController, ],
  providers: [TodoService, TodoDbService]
})
export class TodoModule{}
