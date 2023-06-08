import {Controller, Get, Query} from "@nestjs/common";
import {UserService} from "./user.service";

@Controller('/api/v2/user')
export class UserController {

    constructor(private userService: UserService) {}

    @Get('/create')
    create (@Query('name') name: string ) {
        return this.userService.create(name);
    }

}