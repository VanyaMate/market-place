import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {ApiModule} from "./api/api.module";
import {MongooseModule} from "@nestjs/mongoose";
import {ServeStaticModule} from "@nestjs/serve-static";
import * as path from "path";
import {SharpModule} from "./services/sharp-service/sharp.module";
import {ImageModule} from "./services/image-service/image.module";

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
        SharpModule,
        ImageModule,
    ],
    controllers: [],
    providers: [],
})

export class AppModule {}
