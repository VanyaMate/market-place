import {Body, Controller, Post, UsePipes, Res} from "@nestjs/common";
import {ValidationPipe} from "../../pipes/validation.pipe";
import {UserDto} from "../user/dto/user.dto";
import {UserLoginDto} from "./dto/user-login.dto";
import {AuthService} from "./auth.service";
import { Response } from 'express';
import {UserPrivateDataDto} from "../user/dto/user-private-data.dto";

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
        res.cookie('accessToken', token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        res.json({ user: new UserPrivateDataDto(user) });
    }

    @Post('/login')
    @UsePipes(ValidationPipe)
    login (@Body() userLoginDto: UserLoginDto) {

    }

    @Post('/logout')
    logout () {

    }

}