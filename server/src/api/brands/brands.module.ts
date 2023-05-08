import {Module} from "@nestjs/common";
import {BrandsController} from "./brands.controller";
import {BrandsService} from "./brands.service";
import {UsersModule} from "../users/users.module";
import {TokensModule} from "../tokens/tokens.module";
import {MongooseModule} from "@nestjs/mongoose";
import {Brand, BrandSchema} from "./schemas/brand.schema";
import {FileSystemModule} from "../../fileSystem/file-system.module";

@Module({
    controllers: [ BrandsController ],
    providers: [ BrandsService ],
    imports: [
        TokensModule,
        UsersModule,
        FileSystemModule,
        MongooseModule.forFeature([{ name: Brand.name, schema: BrandSchema }])
    ]
})
export class BrandsModule {}