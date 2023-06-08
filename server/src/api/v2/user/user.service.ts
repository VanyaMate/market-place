import {Injectable} from "@nestjs/common";
import {Service} from "../service-middleware.interface";
import {UserServiceMongoose} from "../service-middlewares/user/user.service-mongoose";
import {UserServiceSequelize} from "../service-middlewares/user/user.service-sequelize";

@Injectable()
export class UserService extends Service<User, UserDto> {
    constructor(userService: UserServiceSequelize) { super(userService) }

    async create (name: string): Promise<User> {
        return await this.middleware.create({ name })
    }

    delete () {

    }

}