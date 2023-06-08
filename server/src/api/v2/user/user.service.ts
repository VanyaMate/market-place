import {Injectable} from "@nestjs/common";
import {ISearchFilter, ISearchOptions, Projections, Service} from "../service-middleware.interface";
import {UserMongooseService} from "../service-middlewares/mongoose/user/user-mongoose.service";
import {IUser} from "./user.interface";
import {UserDto} from "./dto/user.dto";

@Injectable()
export class UserService extends Service<IUser, UserDto> {
    constructor(userService: UserMongooseService) { super(userService) }

    async create (userDto: UserDto): Promise<IUser> {
        return await this.middleware.create(userDto);
    }

    async delete () {
        return await this.middleware.delete({
            email: 'admin@google.com'
        })
    }

    async find (filter: ISearchFilter<IUser> = {}, searchOptions: ISearchOptions<IUser> = {}, projections: Projections<IUser> = {}) {
        return await this.middleware.find(filter, searchOptions, projections);
    }

}