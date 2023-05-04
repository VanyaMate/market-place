import {HttpException, HttpStatus, Inject, Injectable} from "@nestjs/common";
import {USER_REPOSITORY} from "../../database/database.constants";
import {Repository} from "typeorm";
import {User} from "./user.entity";
import {UserDto} from "./dto/user.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

    constructor(@Inject(USER_REPOSITORY) private userRepository: Repository<User>) {}

    async create (userDto: UserDto) {
        try {
            const user = await this.userRepository.create({...userDto})
            user.password = await bcrypt.hash(user.password, 3);

            await this.userRepository.manager.save(user)
            return user;
        }
        catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        }
    }

    async delete () {
        try {

        }
        catch (e) {

        }
    }

    async findByEmail () {
        try {

        }
        catch (e) {

        }
    }

    async findByTelephone () {
        try {

        }
        catch (e) {

        }
    }

    async findById () {
        try {

        }
        catch (e) {

        }
    }

}