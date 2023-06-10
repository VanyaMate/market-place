import {Module} from "@nestjs/common";
import {UserService} from "./user.service";
import {ServiceMiddlewareModule} from "../../service-middlewares/service-middleware.module";

@Module({
    providers: [
        UserService,
    ],
    imports: [
        ServiceMiddlewareModule,
    ],
    exports: [
        UserService,
    ]
})
export class UserModule {}