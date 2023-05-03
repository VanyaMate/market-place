import {BadRequestException, HttpException, Inject} from "@nestjs/common";
import {USER_REPOSITORY} from "../../database/database.constants";
import {Repository} from "typeorm";
import {User} from "./user.entity";
import {validate} from 'class-validator';

export class UserService {

    constructor(@Inject(USER_REPOSITORY) private userRepository: Repository<User>) {}

    async create () {
        try {
            const user = await this.userRepository.create({
                email: Math.random().toString(),
                password: Math.random().toString(),
                lastName: Math.random().toString(),
                firstName: Math.random().toString(),
            })
            /**
             *  Обработка ошибок
             */
            const errors = await validate(user);

            await this.userRepository.manager.save(user)
            return user;
        }
        catch (e) {
            console.log(e);
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