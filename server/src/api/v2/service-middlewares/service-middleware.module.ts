import {Module} from "@nestjs/common";
import {UserMongooseService} from "./mongoose/user/user-mongoose.service";
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "./mongoose/user/schemas/user-mongoose.schema";
import {TokenMongooseService} from "./mongoose/token/token-mongoose.service";
import {Token, TokenSchema} from "./mongoose/token/schemas/token-mongoose.schema";

@Module({
    providers: [
        UserMongooseService,
        TokenMongooseService,
    ],
    exports: [
        UserMongooseService,
        TokenMongooseService,
    ],
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
    ]
})
export class ServiceMiddlewareModule {}