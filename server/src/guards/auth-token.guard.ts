import {CanActivate, ExecutionContext} from "@nestjs/common";
import {Observable} from "rxjs";

export class AuthTokenGuard implements CanActivate {
    constructor() {

    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        return undefined;
    }
}