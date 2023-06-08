import {Module} from "@nestjs/common";
import {DbModule} from "./test_db/db.module";
import {UserModule as UserModuleV2} from "./user/user.module";

@Module({
    imports: [
        DbModule,
        UserModuleV2
    ],
})
export class ApiV2Module {}