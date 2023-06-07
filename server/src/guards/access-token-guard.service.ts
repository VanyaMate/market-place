import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {Request} from 'express';
import {TokensService} from "../api/tokens/tokens.service";
import {ACCESS_TOKEN_NAME, USER_ID} from "../.constants";
import {UsersService} from "../api/users/users.service";
import {SessionService} from "../api/session/session.service";

@Injectable()
export class AccessTokenGuard implements CanActivate {
    constructor(private tokenService: TokensService,
                private usersService: UsersService,
                private sessionService: SessionService,) {}

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
            const key = await this.sessionService.findByUserId(id);

            if (!key || sessionKey !== key) {
                throw { message: 'Ошибка авторизации' };
            }

            req[USER_ID] = id;

            return true;
        }
        catch (e) {
            throw new UnauthorizedException(e);
        }
    }
}