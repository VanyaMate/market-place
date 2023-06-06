import {Module} from "@nestjs/common";
import {CompaniesService} from "./companies.service";
import {CompaniesController} from "./companies.controller";
import {TokensService} from "../tokens/tokens.service";
import {TokensModule} from "../tokens/tokens.module";
import {UsersModule} from "../users/users.module";
import {ImageLoaderModule} from "../image-loader/image-loader.module";
import {MongooseModule} from "@nestjs/mongoose";
import {Company, CompanySchema} from "./schemas/company.schema";

@Module({
    controllers: [
        CompaniesController
    ],
    providers: [
        CompaniesService,
    ],
    imports: [
        TokensModule,
        UsersModule,
        ImageLoaderModule,
        MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }])
    ],
    exports: [
        CompaniesService,
    ]
})
export class CompaniesModule {}