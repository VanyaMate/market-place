import {Module} from "@nestjs/common";
import {UserService} from "./user.service";
import {UserController} from "./user.controller";
import {ServiceMiddlewareModule} from "../service-middlewares/service-middleware.module";

@Module({
    controllers: [
        UserController,
    ],
    providers: [
        UserService,
    ],
    imports: [
        ServiceMiddlewareModule,
    ]

})
export class UserModule {}