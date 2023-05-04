import {DataSource} from "typeorm";
import {Token} from "./token.entity";
import {DATABASE, TOKENS_REPOSITORY} from "../../database/database.constants";

export const tokensProviders = [
    {
        provide: TOKENS_REPOSITORY,
        useFactory: (database: DataSource) => database.getRepository(Token),
        inject: [DATABASE],
    },
];