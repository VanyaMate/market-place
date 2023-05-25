import {Module} from "@nestjs/common";
import {ProductsController} from "./products.controller";
import {ProductsService} from "./products.service";
import {MongooseModule} from "@nestjs/mongoose";
import {Product, ProductSchema} from "./schemas/product.schema";
import {UsersModule} from "../users/users.module";
import {TokensModule} from "../tokens/tokens.module";
import {Brand, BrandSchema} from "../brands/schemas/brand.schema";
import {ImageModule} from "../../image-service/image.module";

@Module({
    controllers: [ ProductsController ],
    providers: [ ProductsService ],
    imports: [
        MongooseModule.forFeature([ { name: Product.name, schema: ProductSchema } ]),
        MongooseModule.forFeature([ { name: Brand.name, schema: BrandSchema } ]),
        UsersModule,
        TokensModule,
        ImageModule,
    ],
    exports: [ ProductsService ]
})
export class ProductsModule {}