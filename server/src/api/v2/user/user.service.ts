import {Injectable} from "@nestjs/common";
import {ISearchFilter, ISearchOptions, Projections} from "../service-middleware.interface";
import {UserMongooseService} from "../service-middlewares/mongoose/user/user-mongoose.service";
import {IUser} from "./user.interface";
import {UserDto} from "./dto/user.dto";

@Injectable()
export class UserService {
    constructor(private userService: UserMongooseService) {}

    async create (userDto: UserDto): Promise<IUser> {
        return await this.userService.create(userDto);
    }

    async delete () {
        return await this.userService.delete({
            email: 'admin@google.com'
        })
    }

    async find (filter: ISearchFilter<IUser> = {}, searchOptions: ISearchOptions<IUser> = {}, projections: Projections<IUser> = {}) {
        return await this.userService.find(filter, searchOptions, projections);
    }

    async update (filter: ISearchFilter<IUser> = {}, params: Partial<UserDto>) {
        return await this.userService.update(filter, params);
    }

}