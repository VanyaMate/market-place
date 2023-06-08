import {Body, Controller, Get, Post, Query, UsePipes} from "@nestjs/common";
import {UserService} from "./user.service";
import {UserDto} from "./dto/user.dto";
import {ValidationPipe} from "../../../pipes/validation.pipe";

@Controller('/api/user')
export class UserController {

    constructor(private userService: UserService) {}

    @Post('/create')
    @UsePipes(ValidationPipe)
    create (@Body() userDto: UserDto) {
        return this.userService.create(userDto);
    }

    @Post('/delete')
    delete () {
        return this.userService.delete();
    }

}