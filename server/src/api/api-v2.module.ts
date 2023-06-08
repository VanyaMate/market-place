import {Module} from "@nestjs/common";
import {UserModule} from "./v2/user/user.module";

@Module({
    imports: [
        UserModule
    ],
})
export class ApiV2Module {}