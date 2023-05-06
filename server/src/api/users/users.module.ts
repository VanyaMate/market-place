import {Module} from "@nestjs/common";
import {UsersController} from "./users.controller";
import {UsersService} from "./users.service";
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "../user/schemas/user.schema";
import {TokensModule} from "../tokens/tokens.module";

@Module({
    controllers: [ UsersController ],
    providers: [
        UsersService
    ],
    imports: [
        MongooseModule.forFeature([ { name: User.name, schema: UserSchema } ]),
        TokensModule,
    ]
})
export class UsersModule {}