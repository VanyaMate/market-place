import {Module} from "@nestjs/common";
import {BrandsController} from "./brands.controller";
import {BrandsService} from "./brands.service";
import {UsersModule} from "../users/users.module";
import {TokensModule} from "../tokens/tokens.module";
import {MongooseModule} from "@nestjs/mongoose";
import {Brand, BrandSchema} from "./schemas/brand.schema";
import {FileSystemModule} from "../../services/fileSystem/file-system.module";
import {ImageModule} from "../../services/image-service/image.module";
import {ImageLoaderModule} from "../image-loader/image-loader.module";
import {CompaniesModule} from "../companies/companies.module";
import {SessionModule} from "../session/session.module";
import {CompanyAccessModule} from "../companyAccess/company-access.module";

@Module({
    controllers: [ BrandsController ],
    providers: [ BrandsService ],
    imports: [
        TokensModule,
        UsersModule,
        FileSystemModule,
        MongooseModule.forFeature([{ name: Brand.name, schema: BrandSchema }]),
        ImageModule,
        ImageLoaderModule,
        CompaniesModule,
        SessionModule,
        CompanyAccessModule,
    ]
})
export class BrandsModule {}