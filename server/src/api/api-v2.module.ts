import {Module} from "@nestjs/common";
import {UserManagerModule} from "./v2/managers/user/user-manager.module";
import {TokenManagerModule} from "./v2/managers/token/token-manager.module";

@Module({
    imports: [
        UserManagerModule,
        TokenManagerModule,
    ],
})
export class ApiV2Module {}