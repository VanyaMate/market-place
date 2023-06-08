import {IDeletedItem, IMultiResponse, IServiceMiddleware} from "../service-middleware.interface";
import {Injectable} from "@nestjs/common";

@Injectable()
export class UserServiceSequelize implements IServiceMiddleware<User, UserDto> {

    create(data: UserDto): Promise<User> {
        return Promise.resolve({ id: 'SequelizeID', name: data.name, createdAt: new Date() });
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