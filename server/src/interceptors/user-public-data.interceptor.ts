import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from "@nestjs/common";
import {map, Observable, tap} from "rxjs";
import {UserPublicDataDto} from "../api/user/dto/user-public-data.dto";

@Injectable()
export class UserPublicDataInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next
            .handle()
            .pipe(
                map((obj: any) => {
                    const { users, ...other } = obj;
                    if (users) {
                        other.users = Array.isArray(users) ? users.map((user) => new UserPublicDataDto(user)) : new UserPublicDataDto(users)
                    }
                    return other;
                }),
            );
    }
}