import {Module} from "@nestjs/common";
import {TokensService} from "./tokens.service";
import {ConfigModule} from "@nestjs/config";
import {tokensProviders} from "./tokens.providers";
import {DatabaseModule} from "../../database/database.module";

@Module({
    providers: [
        ...tokensProviders,
        TokensService,
    ],
    imports: [
        ConfigModule,
        DatabaseModule,
    ],
    exports: [ TokensService ],
})
export class TokensModule {}