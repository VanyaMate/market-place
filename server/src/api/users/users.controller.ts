import {Controller, Get, Query, UseGuards, UseInterceptors} from "@nestjs/common";
import {UsersService} from "./users.service";
import {UserPublicDataInterceptor} from "../../interceptors/user-public-data.interceptor";
import {AccessTokenGuard} from "../../guards/access-token-guard.service";

@Controller('/api/users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @Get('/all')
    @UseGuards(AccessTokenGuard)
    getAll (@Query('limit') limit: number = 10,
            @Query('offset') offset: number = 0) {
        return this.usersService.getAll(Number(limit), Number(offset), {
            email: true,
            firstName: true,
            lastName: true,
            telephone: true,
            orders: true,
        });
    }

    @Get('/findByEmail')
    @UseGuards(AccessTokenGuard)
    getByEmail (@Query('email') email: string,
                @Query('limit') limit: number = 10,
                @Query('offset') offset: number = 0) {
        return this.usersService.findByEmail(email, Number(limit), Number(offset), {
            email: true,
            firstName: true,
            lastName: true,
            telephone: true,
            orders: true,
        });
    }

}