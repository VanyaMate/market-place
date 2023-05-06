import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {DatabaseModule} from "./database/database.module";
import {ApiModule} from "./api/api.module";
import {MongooseModule} from "@nestjs/mongoose";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${ process.env.NODE_ENV }.env`,
            isGlobal: true,
        }),
        MongooseModule.forRoot(process.env.MONGO_DB_URL),
        ApiModule,
    ],
    controllers: [],
    providers: [],
})

export class AppModule {}
