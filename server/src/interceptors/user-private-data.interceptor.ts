import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from "@nestjs/common";
import {map, Observable, tap} from "rxjs";
import {UserPublicDataDto} from "../api/user/dto/user-public-data.dto";
import {UserPrivateDataDto} from "../api/user/dto/user-private-data.dto";

@Injectable()
export class UserPrivateDataInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next
            .handle()
            .pipe(
                map((obj: any) => {
                    const { users, ...other } = obj;
                    if (users) {
                        other.users = Array.isArray(users) ? users.map((user) => new UserPrivateDataDto(user)) : new UserPrivateDataDto(users)
                    }
                    return other;
                }),
            );
    }
}