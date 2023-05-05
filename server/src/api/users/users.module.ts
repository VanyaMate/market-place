import {Module} from "@nestjs/common";
import {UsersController} from "./users.controller";
import {UsersService} from "./users.service";
import {DatabaseModule} from "../../database/database.module";
import {userProviders} from "../user/user.providers";

@Module({
    controllers: [ UsersController ],
    providers: [
        ...userProviders,
        UsersService
    ],
    imports: [ DatabaseModule ]
})
export class UsersModule {}