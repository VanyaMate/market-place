import {Injectable} from "@nestjs/common";
import {Service} from "../service-middleware.interface";
import {UserServiceSequelize} from "../service-middlewares/user/user.service-sequelize";
import {UserServiceMongoose} from "../service-middlewares/user/user.service-mongoose";

@Injectable()
export class UserService extends Service<User, UserDto> {
    constructor(private userService: UserServiceMongoose) { super(userService) }

    async create (name: string): Promise<User> {
        return await this.middleware.create({ name })
    }

    delete () {

    }

}