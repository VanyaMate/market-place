import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {ApiModule} from "./api/api.module";
import {MongooseModule} from "@nestjs/mongoose";
import {ServeStaticModule} from "@nestjs/serve-static";
import * as path from "path";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${ process.env.NODE_ENV }.env`,
            isGlobal: true,
        }),
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, '..', 'public'),
        }),
        MongooseModule.forRoot(process.env.MONGO_DB_URL),
        ApiModule,
    ],
    controllers: [],
    providers: [],
})

export class AppModule {}
