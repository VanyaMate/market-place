import {Module} from "@nestjs/common";
import {UserModule} from "./v1/user/user.module";
import {OrdersModule} from "./v1/orders/orders.module";
import {AuthModule} from "./v1/auth/auth.module";
import {TokensModule} from "./v1/tokens/tokens.module";
import {UsersModule} from "./v1/users/users.module";
import {ProductsModule} from "./v1/products/products.module";
import {BrandsModule} from "./v1/brands/brands.module";
import {CompilationsModule} from "./v1/compilations/compilations.module";
import { CartModule } from './v1/cart/cart.module';
import {ImageLoaderModule} from "./v1/image-loader/image-loader.module";
import {CompaniesModule} from "./v1/companies/companies.module";
import {CompanyAccessModule} from "./v1/company-access/company-access.module";

@Module({
    imports: [
        OrdersModule,
        AuthModule,
        TokensModule,
        UserModule,
        UsersModule,
        ProductsModule,
        BrandsModule,
        CompaniesModule,
        CompilationsModule,
        CartModule,
        ImageLoaderModule,
        CompanyAccessModule,
    ]
})
export class ApiModule {}