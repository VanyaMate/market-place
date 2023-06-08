import {Module} from "@nestjs/common";
import {TokensService} from "./tokens.service";
import {ConfigModule} from "@nestjs/config";
import {MongooseModule} from "@nestjs/mongoose";
import {Token, TokenSchema} from "./schemas/token.schema";

@Module({
    providers: [
        TokensService,
    ],
    imports: [
        ConfigModule,
        MongooseModule.forFeature([ { name: Token.name, schema: TokenSchema, collection: 'tokens' }])
    ],
    exports: [ TokensService ],
})
export class TokensModule {}