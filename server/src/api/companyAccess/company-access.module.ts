import {Module} from "@nestjs/common";
import {CompanyAccessService} from "./company-access.service";
import {MongooseModule} from "@nestjs/mongoose";
import {CompanyAccess, CompanyAccessSchema} from "./schemas/company-access.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: CompanyAccess.name, schema: CompanyAccessSchema }])
    ],
    providers: [
        CompanyAccessService,
    ],
    exports: [
        CompanyAccessService,
    ]
})
export class CompanyAccessModule {}