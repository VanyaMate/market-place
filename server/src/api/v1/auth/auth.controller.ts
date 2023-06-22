import {Body, Controller, Post, UsePipes, Res, UseGuards} from "@nestjs/common";
import {ValidationPipe} from "../../../pipes/validation.pipe";
import {UserLoginDto} from "./dto/user-login.dto";
import {AuthService} from "./auth.service";
import {Response} from 'express';
import {AccessTokenGuard} from "../../../guards/access-token-guard.service";
import {ACCESS_TOKEN_NAME} from "../../../.constants";
import {getMSDays} from "../../../methods.utils";
import {IUserVerifiedData, UserVerified} from "../../../decorators/user-verified.decorator";

@Controller('/api/auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('/registration')
    @UsePipes(ValidationPipe)
    async registration (
        @Body() userDto: UserLoginDto,
        @Res({ passthrough: true }) res: Response,
    ) {
        const [user, token] = await this.authService.registration(userDto);
        res.cookie(ACCESS_TOKEN_NAME, token, {
            httpOnly: true,
            maxAge: getMSDays(7),
        })

        return user;
    }

    @Post('/login')
    @UsePipes(ValidationPipe)
    async login (@Body() userDto: UserLoginDto,
                 @Res({ passthrough: true }) res: Response) {
        const [user, token] = await this.authService.login(userDto);
        res.cookie(ACCESS_TOKEN_NAME, token, {
            httpOnly: true,
            maxAge: getMSDays(7),
        })

        return user;
    }

    @Post('/logout')
    @UseGuards(AccessTokenGuard)
    logout (@Res({ passthrough: true }) res: Response) {
        res.clearCookie(ACCESS_TOKEN_NAME);

        return { logout: true };
    }

    @Post('/token')
    @UseGuards(AccessTokenGuard)
    async token (@UserVerified() user: IUserVerifiedData,
                 @Res({ passthrough: true }) res: Response) {
        const [userData, token] = await this.authService.getPrivateUserData(user.id);
        res.cookie(ACCESS_TOKEN_NAME, token, {
            httpOnly: true,
            maxAge: getMSDays(7),
        })

        return userData;
    }

}