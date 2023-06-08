import {IDeletedItem, IMultiResponse, IServiceMiddleware} from "../../service-middleware.interface";
import {Injectable} from "@nestjs/common";
import {DbMongooseService} from "../../test_db/db-mongoose.service";

@Injectable()
export class UserServiceMongoose implements IServiceMiddleware<User, UserDto> {

    constructor(private mongooseService: DbMongooseService) {}


    create(data: UserDto): Promise<User> {
        // Чисто чтобы проверить
        const user: User = this.mongooseService.users().map((user) => ({
            id: String(user._id.value),
            name: data.name,
            createdAt: user.createdAt
        }))[0];

        return Promise.resolve(user);
    }

    delete(filter: Partial<User>): Promise<IDeletedItem> {
        return Promise.resolve(undefined);
    }

    findById(id: string): Promise<User> {
        return Promise.resolve(undefined);
    }

    findMany(filter: Partial<User>): Promise<IMultiResponse<User>> {
        return Promise.resolve(undefined);
    }

    update(params: Partial<UserDto>): Promise<User> {
        return Promise.resolve(undefined);
    }

}