import {Controller, Get, Post} from "@nestjs/common";
import {UserService} from "./user.service";

@Controller('/api/user')
export class UserController {

    constructor(private userService: UserService) {}

    @Post('/create')
    create () {
        return this.userService.create();
    }

    @Post('/delete')
    delete () {
        return this.userService.delete();
    }

    @Get('/findByEmail')
    findByEmail () {
        return this.userService.findByEmail();
    }

    @Get('/findByTelephone')
    findByTelephone () {
        return this.userService.findByTelephone();
    }

    @Get('/findById')
    findById () {
        return this.userService.findById();
    }

}