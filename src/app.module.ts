import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PremierModule } from './premier/premier.module';
import { TodoModule } from './todo/todo.module';
import { CommonModule } from './common/common.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {TodoEntity} from "./todo/entity/todo.entity";
import {AuthenticationMiddleware} from "./authentication/middlewares/authentication.middleware";
import {ConfigModule} from "@nestjs/config";
import { UserModule } from './user/user.module';
import { SkillModule } from './skill/skill.module';
import {Skill} from "./skill/entities/skill.entity";
import {User} from "./user/entities/user.entity";
import { CvModule } from './cv/cv.module';
import {Cv} from "./cv/entities/cv.entity";



@Module({
  imports: [
      ConfigModule.forRoot(
          {
            isGlobal : true
          }
      ),
      PremierModule,
    TodoModule,
    CommonModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: "",
      database: 'tp-nest',
      entities: [TodoEntity, Skill, User, Cv],
      synchronize: true,
    }),
    UserModule,
    SkillModule,
    CvModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{

  configure(consumer: MiddlewareConsumer): any {
    consumer
        .apply(AuthenticationMiddleware)
        .forRoutes("todo")
  }


}
