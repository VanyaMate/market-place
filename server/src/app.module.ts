import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {DatabaseModule} from "./database/database.module";
import {ApiModule} from "./api/api.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${ process.env.NODE_ENV }.env`,
            isGlobal: true,
        }),
        DatabaseModule,
        ApiModule,
    ],
    controllers: [],
    providers: [],
})

export class AppModule {}
