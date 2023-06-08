import {Module} from "@nestjs/common";
import {UserModule} from "./user/user.module";
import {OrdersModule} from "./orders/orders.module";
import {AuthModule} from "./auth/auth.module";
import {TokensModule} from "./tokens/tokens.module";
import {UsersModule} from "./users/users.module";
import {ProductsModule} from "./products/products.module";
import {BrandsModule} from "./brands/brands.module";
import {CompilationsModule} from "./compilations/compilations.module";
import { CartModule } from './cart/cart.module';
import {ImageLoaderModule} from "./image-loader/image-loader.module";
import {CompaniesModule} from "./companies/companies.module";
import {CompanyAccessModule} from "./company-access/company-access.module";

import {UserModule as UserModuleV2} from './v2/user/user.module';

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
        UserModuleV2,
    ]
})
export class ApiModule {}