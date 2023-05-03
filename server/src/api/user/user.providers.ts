import {DataSource} from "typeorm";
import {User} from "./user.entity";
import {DATABASE, USER_REPOSITORY} from "../../database/database.constants";

export const userProviders = [
    {
        provide: USER_REPOSITORY,
        useFactory: (database: DataSource) => database.getRepository(User),
        inject: [DATABASE],
    },
];