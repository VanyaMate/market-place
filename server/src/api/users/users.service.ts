import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "../user/schemas/user.schema";
import {Model} from "mongoose";
import {HttpException, HttpStatus, Injectable} from "@nestjs/common";

@Injectable()
export class UsersService {

    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async getAll (limit: number = 10, offset: number = 0, projections: { [key: string]: boolean } = {}): Promise<{
        users: UserDocument[],
        count: number,
        limit: number,
        offset: number
    }>  {
        try {
            const users: UserDocument[] = await this.userModel
                .find({}, projections)
                .skip(offset)
                .limit(limit) as UserDocument[];

            const count: number = await this.userModel.count() as number;

            return { users, count, limit, offset };
        }
        catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        }
    }

    async findByEmail (email: string, limit: number = 10, offset: number = 0, projections: { [key: string]: boolean } = {}): Promise<{
        users: UserDocument[],
        count: number,
        limit: number,
        offset: number
    }> {
        try {
            const users: UserDocument[] = await this.userModel
                .find({ email: { "$regex": `^${email}`, "$options": "i" } }, projections)
                .skip(offset)
                .limit(limit) as UserDocument[];

            const count: number = await this.userModel
                .count({ email: { "$regex": `^${email}`, "$options": "i" } }) as number;

            return { users, count, limit, offset };
        }
        catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        }
    }

    async findById (id: string, projections: { [key: string]: boolean } = {}) {
        try {
            return await this.userModel.findById(id, projections);
        }
        catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        }
    }

}