import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {Observable} from "rxjs";
import {Request} from 'express';
import {TokensService} from "../api/tokens/tokens.service";
import {ACCESS_TOKEN_NAME} from "../.constants";

@Injectable()
export class AccessTokenGuard implements CanActivate {
    constructor(private tokenService: TokensService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req: Request = context.switchToHttp().getRequest();
        try {
            const accessToken = req.cookies?.[ACCESS_TOKEN_NAME];
            if (!accessToken) {
                throw new UnauthorizedException({ message: 'Ошибка авторизации' });
            }

            const verified = this.tokenService.verifyToken(accessToken);
            if (!verified) {
                throw new UnauthorizedException({ message: 'Ошибка авторизации' });
            }

            return true;
        }
        catch (e) {
            throw new UnauthorizedException({ message: 'Ошибка авторизации' });
        }
    }
}