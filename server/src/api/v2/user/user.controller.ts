import {Body, Controller, Delete, Get, Post, Query, UsePipes} from "@nestjs/common";
import {UserService} from "./user.service";
import {ValidationPipe} from "../../../pipes/validation.pipe";
import {UserDto} from "./dto/user.dto";
import {SortParams} from "../../../decorators/sort-params.decorator";
import {ISearchOptions} from "../service-middleware.interface";
import {IUser} from "./user.interface";
import {SearchFilter} from "../../../decorators/search-filter.decorator";

@Controller('/api/v2/user')
export class UserController {

    constructor(private userService: UserService) {}

    @Post('/create')
    @UsePipes(ValidationPipe)
    create (@Body() userDto: UserDto) {
        return this.userService.create(userDto);
    }

    @Delete('/delete')
    @UsePipes(ValidationPipe)
    delete () {
        return this.userService.delete();
    }

    @Get('/find')
    find (@SortParams() params: ISearchOptions<IUser>,
          @SearchFilter() filter: Partial<IUser>) {
        return this.userService.find(filter, params);
    }

}