import {Body, Controller, Delete, Get, Post, Put, UsePipes} from "@nestjs/common";
import {UserService} from "../../services/user/user.service";
import {ValidationPipe} from "../../../../pipes/validation.pipe";
import {UserDto} from "../../services/user/dto/user.dto";
import {SortParams} from "../../../../decorators/sort-params.decorator";
import {ISearchFilter, ISearchOptions} from "../../service-middleware.interface";
import {IUser} from "../../services/user/user.interface";
import {SearchFilter} from "../../../../decorators/search-filter.decorator";
import {UserManagerService} from "./user-manager.service";

@Controller('/api/v2/user')
export class UserManagerController {

    constructor(private userManagerService: UserManagerService) {}

    @Post('/create')
    @UsePipes(ValidationPipe)
    create (@Body() userDto: UserDto) {
        return this.userManagerService.create(userDto);
    }

    @Delete('/delete')
    @UsePipes(ValidationPipe)
    delete () {
        return this.userManagerService.delete();
    }

    @Get('/find')
    find (@SortParams() params: ISearchOptions<IUser>,
          @SearchFilter() filter: ISearchFilter<IUser>) {
        return this.userManagerService.find(filter, params);
    }

    @Put('/update')
    @UsePipes(ValidationPipe)
    update (@SearchFilter() filter: ISearchFilter<IUser>,
            @Body() params: Partial<UserDto>) {
        return this.userManagerService.update(filter, params);
    }

}