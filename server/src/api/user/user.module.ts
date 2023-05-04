import {Module} from "@nestjs/common";
import {UserController} from "./user.controller";
import {UserService} from "./user.service";
import {userProviders} from "./user.providers";
import {DatabaseModule} from "../../database/database.module";

@Module({
    controllers: [ UserController ],
    providers: [
        ...userProviders,
        UserService
    ],
    imports: [ DatabaseModule ],
    exports: [ UserService ]
})
export class UserModule {}