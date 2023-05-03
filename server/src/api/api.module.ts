import {Module} from "@nestjs/common";
import {UserModule} from "./user/user.module";
import {OrdersModule} from "./orders/orders.module";
import {AuthModule} from "./auth/auth.module";
import {TokensModule} from "./tokens/tokens.module";

@Module({
    imports: [
        UserModule,
        OrdersModule,
        AuthModule,
        TokensModule,
    ]
})
export class ApiModule {}