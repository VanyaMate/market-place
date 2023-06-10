import {Injectable} from "@nestjs/common";
import {UserService} from "../../services/user/user.service";
import {UserDto} from "../../services/user/dto/user.dto";
import {IUser} from "../../services/user/user.interface";
import {ISearchFilter, ISearchOptions, Projections} from "../../service-middleware.interface";
import {TokenService} from "../../services/token/token.service";
import {IToken} from "../../services/token/token.interface";

@Injectable()
export class UserManagerService {

    constructor(private userService: UserService,
                private tokenService: TokenService) {}

    async create (userDto: UserDto): Promise<IUser> {
        const user: IUser = await this.userService.create(userDto);
        const token: IToken = await this.tokenService.create(user.id);
        return user;
    }

    async delete () {
        return await this.userService.delete();
    }

    async find (filter: ISearchFilter<IUser> = {}, searchOptions: ISearchOptions<IUser> = {}, projections: Projections<IUser> = {}) {
        return await this.userService.find(filter, searchOptions, projections);
    }

    async update (filter: ISearchFilter<IUser> = {}, params: Partial<UserDto>) {
        return await this.userService.update(filter, params);
    }

}