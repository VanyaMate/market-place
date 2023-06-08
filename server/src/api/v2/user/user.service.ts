import {Injectable} from "@nestjs/common";
import {Service} from "../service-middleware.interface";
import {UserServiceSequelize} from "./user.service-sequelize";

@Injectable()
export class UserService extends Service<User, UserDto> {
    constructor() { super(new UserServiceSequelize()) }

    async create (name: string): Promise<User> {
        return await this.middleware.create({ name })
    }

    delete () {

    }

}