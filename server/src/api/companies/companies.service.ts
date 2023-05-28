import {Injectable} from "@nestjs/common";
import {CreateCompanyDto} from "./dto/create-company.dto";
import {InjectModel} from "@nestjs/mongoose";
import {Image} from "../image-loader/schemas/image.schema";
import {Model} from "mongoose";
import {FolderType} from "../../file-service/file-service.service";
import {ImageSize} from "../../sharp-service/sharp.service";
import {ImageLoaderService} from "../image-loader/image-loader.service";
import {Company} from "./schemas/company.schema";

@Injectable()
export class CompaniesService {

    private defaultCompanyIconSizes: ImageSize[] = [
        { width: 200, height: 200 },
        { width: 400, height: 400 },
    ]

    constructor(private imageLoaderService: ImageLoaderService,
                @InjectModel(Company.name) private companyModel: Model<Company>) {}

    async create (companyDto: CreateCompanyDto & { icon: Express.Multer.File }, userId: string) {
        const [ icon ] = await this.imageLoaderService.load(
            [companyDto.icon],
            FolderType.COMPANY,
            userId,
            this.defaultCompanyIconSizes
        );
        const company = (await this.companyModel.create({
            ...companyDto,
            icon: icon.id,
            user: userId,
        }))
            .populate('icon');

        return company;
    }

}