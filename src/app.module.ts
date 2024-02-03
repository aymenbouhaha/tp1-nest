import { Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { CommonModule } from './common/common.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {TodoEntity} from "./todo/entity/todo.entity";
import {ConfigModule} from "@nestjs/config";
import { UserModule } from './user/user.module';
import { SkillModule } from './skill/skill.module';
import {User} from "./user/entities/user.entity";
import { CvModule } from './cv/cv.module'
import { APP_INTERCEPTOR } from '@nestjs/core';
import {RequestLoggingInterceptor} from "./log.interceptor";



@Module({
  imports: [
      ConfigModule.forRoot(
          {
            isGlobal : true
          }
      ),
    TodoModule,
    CommonModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: "",
      database: 'mobile',
      entities: [TodoEntity, User],
      synchronize: true,
    }),
    UserModule,
    SkillModule,
    CvModule,
  ],
  controllers: [AppController],
  providers: [
      AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestLoggingInterceptor,
    }
  ],
})
export class AppModule {


}
