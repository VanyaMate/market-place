import {Module} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {AuthController} from "./auth.controller";
import {TokensModule} from "../tokens/tokens.module";

@Module({
    controllers: [ AuthController ],
    providers: [ AuthService ],
    imports: [ TokensModule ],
})
export class AuthModule {}