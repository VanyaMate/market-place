import {Module} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {AuthController} from "./auth.controller";
import {TokensModule} from "../tokens/tokens.module";
import {UserModule} from "../user/user.module";
import {UsersModule} from "../users/users.module";
import {CartModule} from "../cart/cart.module";

@Module({
    controllers: [ AuthController ],
    providers: [ AuthService ],
    imports: [
        TokensModule,
        UserModule,
        UsersModule,
        CartModule,
    ],
})
export class AuthModule {}