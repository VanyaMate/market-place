import {Module} from "@nestjs/common";
import {TokenService} from "./token.service";
import {ServiceMiddlewareModule} from "../../service-middlewares/service-middleware.module";

@Module({
    providers: [
        TokenService,
    ],
    exports: [
        TokenService,
    ],
    imports: [
        ServiceMiddlewareModule,
    ]
})
export class TokenModule {}
