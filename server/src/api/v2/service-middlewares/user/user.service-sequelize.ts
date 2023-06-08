import {IDeletedItem, IMultiResponse, IServiceMiddleware} from "../../service-middleware.interface";
import {Injectable} from "@nestjs/common";
import {DbPostgreeService} from "../../test_db/db-postgree.service";

@Injectable()
export class UserServiceSequelize implements IServiceMiddleware<User, UserDto> {

    constructor(private postgreeService: DbPostgreeService) {}

    create(data: UserDto): Promise<User> {
        const postgreUser = this.postgreeService.getUsers();
        const user: User = {
            id: String(postgreUser.id),
            name: data.name,
            createdAt: new Date(postgreUser.createdAt)
        }

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