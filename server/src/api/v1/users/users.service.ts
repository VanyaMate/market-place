import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "../user/schemas/user.schema";
import {Model} from "mongoose";
import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {ISearchOptions, Projections} from "../../../interfaces/search.interfaces";
import {IMultiResponse} from "../../../interfaces/responses.interface";
import {getSortParams} from "../../../helpers/utils";

@Injectable()
export class UsersService {

    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async getAll (options: ISearchOptions = {}, projections: Projections<UserDocument> = {}): Promise<IMultiResponse<UserDocument>>  {
        try {
            const users: UserDocument[] = await this.userModel
                .find({}, projections)
                .skip(options.offset)
                .limit(options.limit)
                .sort(getSortParams(options.sort))

            const count: number = await this.userModel.count() as number;

            return {
                list: users,
                count: count,
                options: options
            }
        }
        catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        }
    }

    async findByEmail (email: string, options: ISearchOptions = {}, projections: Projections<UserDocument> = {}): Promise<IMultiResponse<UserDocument>> {
        try {
            const users: UserDocument[] = await this.userModel
                .find({ email: { "$regex": `^${email}`, "$options": "i" } }, projections)
                .skip(options.offset)
                .limit(options.limit)
                .sort(getSortParams(options.sort));

            const count: number = await this.userModel
                .count({ email: { "$regex": `^${email}`, "$options": "i" } }) as number;

            return {
                list: users,
                count: count,
                options: options,
            };
        }
        catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        }
    }

    async findById (id: string, projections: Projections<UserDocument> = {}): Promise<UserDocument> {
        try {
            return await this.userModel.findById(id, projections);
        }
        catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        }
    }

}