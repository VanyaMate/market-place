import {Module} from "@nestjs/common";
import {UserModule} from "./user/user.module";
import {OrdersModule} from "./orders/orders.module";
import {AuthModule} from "./auth/auth.module";
import {TokensModule} from "./tokens/tokens.module";
import {UsersModule} from "./users/users.module";

@Module({
    imports: [
        OrdersModule,
        AuthModule,
        TokensModule,
        UserModule,
        UsersModule,
    ]
})
export class ApiModule {}