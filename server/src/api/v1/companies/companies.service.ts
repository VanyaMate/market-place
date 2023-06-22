import {BadRequestException, forwardRef, HttpException, HttpStatus, Inject, Injectable} from "@nestjs/common";
import {CreateCompanyDto} from "./dto/create-company.dto";
import {InjectModel} from "@nestjs/mongoose";
import {Image} from "../image-loader/schemas/image.schema";
import {Model} from "mongoose";
import {FolderType} from "../../../services/file-service/file-service.service";
import {ImageSize} from "../../../services/sharp-service/sharp.service";
import {ImageLoaderService} from "../image-loader/image-loader.service";
import {Company, CompanyDocument} from "./schemas/company.schema";
import {CompanyAccessService} from "../company-access/company-access.service";
import {BrandsService} from "../brands/brands.service";
import {ISearchOptions, Projections} from "../../../interfaces/search.interfaces";

@Injectable()
export class CompaniesService {

    private defaultCompanyIconSizes: ImageSize[] = [
        { width: 200, height: 200 },
        { width: 400, height: 400 },
    ]

    constructor(private imageLoaderService: ImageLoaderService,
                private companyAccessService: CompanyAccessService,
                @Inject(forwardRef(() => BrandsService)) private brandsService: BrandsService,
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
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
        }
    }

    async delete (userId: string, companyTitle: string) {
        try {
            const company = await this.companyModel.findOne({ title: companyTitle });
            const access = await this.companyAccessService.checkAccess(userId, company._id.toString());

            if (access) {
                await this.companyModel.findByIdAndDelete(company._id.toString());
                await this.companyAccessService.deleteAllByCompanyId(company._id.toString());
                return this.brandsService.deleteManyWithoutAccessCheckByCompanyId(company._id.toString());
            }
            else {
                throw { message: 'Нет доступа' };
            }
        }
        catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
        }
    }

    /**
     * TODO: Добавить лимит, offset и итд
     * @param userId
     */
    async getAllByUser (userId: string, options: ISearchOptions = {}, projections: Projections<CompanyDocument> = {}) {
        return await this.companyAccessService
            .getAllCompaniesAccessByUserId(userId, options, projections);
    }

    async getOneByTitle (title: string) {
        try {
            const company = await this.companyModel
                .findOne({ title })
                .populate(['icon'])
                .exec();

            if (company) {
                return company;
            } else {
                throw { message: 'Такой компании не существует' }
            }
        }
        catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
        }
    }

    async getFullOneByTitle (userId: string, title: string) {
        try {
            const company = await this.companyModel
                .findOne({ title })
                .exec();

            if (!company) { throw { message: 'Такой компании не существует' } }

            const access = await this.companyAccessService.checkAccess(userId, company._id.toString());

            if (access) {
                const brands = await this.brandsService.getByCompany(title);
                return {
                    company: company,
                    brands: brands,
                };
            } else {
                throw { message: 'Нету доступа' }
            }
        }
        catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
        }
    }

}