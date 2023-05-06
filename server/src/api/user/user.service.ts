import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {User, UserDocument} from "./schemas/user.schema";
import {UserDto} from "./dto/user.dto";
import * as bcrypt from 'bcrypt';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import * as uuid from 'uuid';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async create (userDto: UserDto): Promise<UserDocument> {
        try {
            const user = await this.userModel.create({
                ...userDto,
                password: await bcrypt.hash(userDto.password, 3),
                secretKey: uuid.v4(),
            })

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