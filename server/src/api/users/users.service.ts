import {InjectModel} from "@nestjs/mongoose";
import {User} from "../user/schemas/user.schema";
import {Model} from "mongoose";


export class UsersService {

    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async getAll () {
        const users = await this.userModel.find();

        return users;
    }

    async findByEmail (email: string) {
        const users = await this.userModel.find({ email: { "$regex": `^${email}`, "$options": "i" } });

        return users;
    }

}