import {
    IDeletedItem,
    IMultiResponse, ISearchFilter,
    ISearchOptions,
    IServiceMiddleware,
    Projections
} from "../../../service-middleware.interface";
import {IUser} from "../../../user/user.interface";
import {InjectModel} from "@nestjs/mongoose";
import {UserDocument, User} from "./schemas/user-mongoose.schema";
import {FilterQuery, Model, Types, UpdateWriteOpResult} from "mongoose";
import {UserDto} from "../../../user/dto/user.dto";
import {ObjectModel} from "../mongoose.interface";
import {DeleteResult} from "mongodb";

export class UserMongooseService implements IServiceMiddleware<IUser, UserDto>{

    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async create(data: UserDto): Promise<IUser> {
        const createdAt: Date = new Date();
        const user: UserDocument = await this.userModel.create({
            ...data,
            createdAt: createdAt
        });

        return this._configureToOut(user);
    }

    async delete(filter: ISearchFilter<IUser>): Promise<boolean> {
        const usersCount: number = await this.userModel.find(filter).count();
        const result: DeleteResult = await this.userModel.deleteMany(filter);
        return result.deletedCount === usersCount;
    }

    async findById(id: string): Promise<IUser> {
        return this._configureToOut(await this.userModel.findById(id));
    }

    async find(filter: ISearchFilter<IUser> = {}, searchOptions: ISearchOptions<IUser> = {}, projections: Projections<IUser> = {}): Promise<IMultiResponse<IUser>> {
        const _filter: FilterQuery<User> = this._configureToFilter(filter);
        const _projections: Projections<UserDocument> = this._configureToProjections(projections);
        const count: number = await this.userModel.find(_filter).count();
        const users: UserDocument[] = await this.userModel
            .find(_filter, _projections)
            .limit(searchOptions.limit)
            .skip(searchOptions.offset)
            .sort(searchOptions.sort);

        return {
            list: users.map((user) => this._configureToOut(user)),
            count: count,
            options: searchOptions,
        }
    }

    async update(filter: ISearchFilter<IUser>, params: Partial<UserDto>): Promise<boolean> {
        const _filter: FilterQuery<User> = this._configureToFilter(filter);
        const result: UpdateWriteOpResult = await this.userModel.updateOne(_filter, params).exec();
        return result.acknowledged;
    }

    private _configureToOut (user: UserDocument): IUser {
        return {
            id: user._id.toString(),
            ...(() => {
                const data: ObjectModel<UserDocument> = user.toObject();
                delete data._id;
                delete data.__v;
                return data;
            })(),
        }
    }

    private _configureToProjections (user: Projections<IUser>): Projections<UserDocument> {
        const projections: Projections<UserDocument> = {...user};
        if (user.id) { projections._id = user.id; }
        delete projections.id;
        return projections;
    }

    private _configureToFilter (user: ISearchFilter<IUser>): FilterQuery<User> {
        const id: string = user.id;
        const filters: FilterQuery<User> = {...user};
        delete filters.id;
        if (id) {
            filters._id = id;
        }
        return filters;
    }
}