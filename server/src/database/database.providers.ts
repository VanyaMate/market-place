import {DataSource} from "typeorm";
import {ConfigService} from "@nestjs/config";

export const databaseProviders = [
    {
        provide: 'DATABASE',
        useFactory: async (config: ConfigService) => {
            const dataSource = new DataSource({
                type: 'mongodb',
                host: config.get<string>("MONGO_DB_HOST"),
                port: Number(config.get<number>("MONGO_DB_PORT")),
                username: config.get<string>("MONGO_DB_LOGIN"),
                password: config.get<string>("MONGO_DB_PASSWORD"),
                database: config.get<string>("MONGO_DB_NAME"),
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