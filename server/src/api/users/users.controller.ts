import {Controller, Get, Param, Query, UseGuards, UseInterceptors} from "@nestjs/common";
import {UsersService} from "./users.service";
import {UserPublicInterceptor} from "../../interceptors/user-public.interceptor";
import {AccessTokenGuard} from "../../guards/access-token-guard.service";

@Controller('/api/users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @Get('/all')
    @UseGuards(AccessTokenGuard)
    @UseInterceptors(UserPublicInterceptor)
    getAll () {
        return this.usersService.getAll();
    }

    @Get('/findByEmail')
    @UseGuards(AccessTokenGuard)
    @UseInterceptors(UserPublicInterceptor)
    getByEmail (@Query('email') email: string) {
        return this.usersService.findByEmail(email);
    }

}