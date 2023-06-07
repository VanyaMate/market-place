import {BadRequestException, Injectable} from "@nestjs/common";
import {CreateCompanyDto} from "./dto/create-company.dto";
import {InjectModel} from "@nestjs/mongoose";
import {Image} from "../image-loader/schemas/image.schema";
import {Model} from "mongoose";
import {FolderType} from "../../services/file-service/file-service.service";
import {ImageSize} from "../../services/sharp-service/sharp.service";
import {ImageLoaderService} from "../image-loader/image-loader.service";
import {Company} from "./schemas/company.schema";
import {CompanyAccessService} from "../companyAccess/company-access.service";

@Injectable()
export class CompaniesService {

    private defaultCompanyIconSizes: ImageSize[] = [
        { width: 200, height: 200 },
        { width: 400, height: 400 },
    ]

    constructor(private imageLoaderService: ImageLoaderService,
                private companyAccessService: CompanyAccessService,
                @InjectModel(Company.name) private companyModel: Model<Company>) {}

    async create (companyDto: CreateCompanyDto & { icon: Express.Multer.File }, userId: string) {
        try {
            /**
             * TODO: Сделать так, что картинки загружаются от имени компании
             */
            const [ icon ] = await this.imageLoaderService.load(
                [companyDto.icon],
                FolderType.COMPANY,
                userId,
                this.defaultCompanyIconSizes
            );

            const company = await this.companyModel
                .create({
                    ...companyDto,
                    icon: icon.id
                })
                .then((company) => {
                    return company.populate('icon');
                })
                .catch((error) => {
                    throw {
                        message: error.code === 11000 ?
                            'Компания с таким названием уже существует' :
                            'Ошибка создания компании'
                    }
                })

            await this.companyAccessService.create(userId, company._id.toString())
            return company;
        }
        catch (e) {
            throw new BadRequestException(e);
        }
    }

    /**
     * TODO: Добавить лимит, offset и итд
     * @param userId
     */
    async getAllByUser (userId: string) {
        return await this.companyAccessService
            .getAllCompaniesAccessByUserId(userId);
    }

    async getByTitle (title: string) {
        const company = await this.companyModel
            .findOne({ title })
            .populate(['icon'])
            .exec();

        if (company) {
            return company;
        } else {
            throw new BadRequestException('Нету доступа')
        }
    }

    async getFullByTitle (userId: string, title: string) {
        const company = await this.companyModel
            .findOne({ title: title })
            .populate(['icon'])
            .exec();
        const access = await this.companyAccessService.checkAccess(userId, company._id.toString());

        if (company && access) {
            return company;
        } else {
            throw new BadRequestException('Нету доступа')
        }
    }

}