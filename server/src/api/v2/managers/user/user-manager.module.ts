import {Module} from "@nestjs/common";
import {UserManagerController} from "./user-manager.controller";
import {UserManagerService} from "./user-manager.service";
import {UserModule} from "../../services/user/user.module";
import {TokenModule} from "../../services/token/token.module";

@Module({
    controllers: [
        UserManagerController,
    ],
    providers: [
        UserManagerService
    ],
    imports: [
        UserModule,
        TokenModule,
    ],
})
export class UserManagerModule {}