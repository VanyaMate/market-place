import {ConfigService} from "@nestjs/config";
import {DATABASE} from "./database.constants";
import {
    MONGO_DB_URL
} from "../env.constants";
import * as mongoose from "mongoose";

export const databaseProviders = [
    {
        provide: DATABASE,
        useFactory: async (config: ConfigService) => {
            await mongoose.connect(config.get<string>(MONGO_DB_URL));
        },
        inject: [ConfigService]
    }
]