import {Inject} from "@nestjs/common";
import {USER_REPOSITORY} from "../../database/database.constants";
import {Repository} from "typeorm";
import {User} from "../user/user.entity";

export class UsersService {

    constructor(@Inject(USER_REPOSITORY) private userRepository: Repository<User>) {}

    async getAll () {
        return this.userRepository.find({
            relations: {

            }
        });
    }

}