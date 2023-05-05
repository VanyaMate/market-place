import {DataSource} from "typeorm";
import {ConfigService} from "@nestjs/config";
import {DATABASE} from "./database.constants";
import {MONGO_DB_HOST, MONGO_DB_LOGIN, MONGO_DB_NAME, MONGO_DB_PASSWORD, MONGO_DB_PORT} from "../env.constants";

export const databaseProviders = [
    {
        provide: DATABASE,
        useFactory: async (config: ConfigService) => {
            const dataSource = new DataSource({
                type: 'mongodb',
                host: config.get<string>(MONGO_DB_HOST),
                port: Number(config.get<number>(MONGO_DB_PORT)),
                username: config.get<string>(MONGO_DB_LOGIN),
                password: config.get<string>(MONGO_DB_PASSWORD),
                database: config.get<string>(MONGO_DB_NAME),
                entities: [
                    __dirname + '/../**/*.entity{.ts,.js}',
                ],
                synchronize: true,
                logging: true,
                extra: {
                    "ssl": true,
                    "authSource": "admin",
                }
            })

            return dataSource.initialize();
        },
        inject: [ConfigService]
    }
]