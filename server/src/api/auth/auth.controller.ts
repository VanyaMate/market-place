import {Body, Controller, Post, UsePipes} from "@nestjs/common";
import {ValidationPipe} from "../../pipes/validation.pipe";
import {UserDto} from "../user/dto/user.dto";
import {UserLoginDto} from "./dto/user-login.dto";
import {AuthService} from "./auth.service";

@Controller('/api/auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('/registration')
    @UsePipes(ValidationPipe)
    registration (@Body() userDto: UserDto) {
        return this.authService.registration();
    }

    @Post('/login')
    @UsePipes(ValidationPipe)
    login (@Body() userLoginDto: UserLoginDto) {

    }

    @Post('/logout')
    logout () {

    }

}