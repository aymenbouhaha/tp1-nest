import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import {Request} from "express";

@Injectable()
export class RequestLoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request : Request = context.switchToHttp().getRequest();
        console.log('Request body:', request.body);
        console.log("Hedears:" ,request.headers)
        return next.handle();
    }
}
