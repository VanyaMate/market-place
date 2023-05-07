import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {catchError, Observable} from "rxjs";
import {Request} from 'express';
import {TokensService} from "../api/tokens/tokens.service";
import {ACCESS_TOKEN_NAME} from "../.constants";
import {UsersService} from "../api/users/users.service";

@Injectable()
export class AccessTokenGuard implements CanActivate {
    constructor(private tokenService: TokensService,
                private usersService: UsersService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req: Request = context.switchToHttp().getRequest();
        try {
            const accessToken = req.cookies?.[ACCESS_TOKEN_NAME];
            if (!accessToken) {
                throw { message: 'Ошибка авторизации' };
            }

            const verified = this.tokenService.verifyToken(accessToken);
            if (!verified) {
                throw { message: 'Ошибка авторизации' };
            }

            const { id, sessionKey } = verified;
            const { users } = await this.usersService.findById(id);
            const [ user ] = users;

            if (!user || user.sessionKey !== sessionKey) {
                throw { message: 'Ошибка авторизации' };
            }

            return true;
        }
        catch (e) {
            throw new UnauthorizedException(e);
        }
    }
}