import {Body, Controller, Post, UsePipes, Res, UseGuards} from "@nestjs/common";
import {ValidationPipe} from "../../pipes/validation.pipe";
import {UserLoginDto} from "./dto/user-login.dto";
import {AuthService} from "./auth.service";
import {Response} from 'express';
import {UserPrivateDataDto} from "../user/dto/user-private-data.dto";
import {AccessTokenGuard} from "../../guards/access-token-guard.service";
import {Cookies} from "../../decorators/cookies.decorator";
import {ACCESS_TOKEN_NAME} from "../../.constants";
import {getMSDays} from "../../methods.utils";

@Controller('/api/auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('/registration')
    @UsePipes(ValidationPipe)
    async registration (
        @Body() userDto: UserLoginDto,
        @Res() res: Response,
    ) {
        const [user, token] = await this.authService.registration(userDto);
        res.cookie(ACCESS_TOKEN_NAME, token, {
            httpOnly: true,
            maxAge: getMSDays(7),
        })
        res.status(201).json(user);
    }

    @Post('/login')
    @UsePipes(ValidationPipe)
    async login (@Body() userDto: UserLoginDto,
                 @Res() res: Response) {
        const [user, token] = await this.authService.login(userDto);
        res.cookie(ACCESS_TOKEN_NAME, token, {
            httpOnly: true,
            maxAge: getMSDays(7),
        })
        res.status(200).json(user);
    }

    @Post('/logout')
    @UseGuards(AccessTokenGuard)
    logout (@Cookies(ACCESS_TOKEN_NAME) accessToken: string,
            @Res() res: Response) {
        res.clearCookie(ACCESS_TOKEN_NAME);
        res.json({ logout: true })
    }

}