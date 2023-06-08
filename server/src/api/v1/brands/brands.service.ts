import {BadRequestException, forwardRef, Inject, Injectable} from "@nestjs/common";
import {BrandDto} from "./dto/brand.dto";
import {Model} from "mongoose";
import {FileSystemService} from "../../../services/fileSystem/file-system.service";
import {InjectModel} from "@nestjs/mongoose";
import {Brand, BrandDocument} from "./schemas/brand.schema";
import {ISearchOptions, Projections} from "../../../interfaces/search.interfaces";
import {FolderType} from "../../../services/file-service/file-service.service";
import {ImageSize} from "../../../services/sharp-service/sharp.service";
import {ImageLoaderService} from "../image-loader/image-loader.service";
import {CompaniesService} from "../companies/companies.service";
import {CompanyAccessService} from "../company-access/company-access.service";
import {getSortParams} from "../../../helpers/utils";
import {IMultiResponse} from "../../../interfaces/responses.interface";

@Injectable()
export class BrandsService {

    private defaultBrandSizes: ImageSize[] = [
        { width: 50, height: 50 },
        { width: 100, height: 100 },
        { width: 200, height: 200 },
        { width: 400, height: 400 },
    ];

    constructor(@InjectModel(Brand.name) private brandModel: Model<Brand>,
                @Inject(forwardRef(() => CompaniesService)) private companiesService: CompaniesService,
                private fileSystemService: FileSystemService,
                private imageLoaderService: ImageLoaderService,
                private companyAccessService: CompanyAccessService) {}

    async create (userId: string, brandDdo: BrandDto, image: Express.Multer.File): Promise<BrandDocument> {
        try {
            const { companyTitle, ...brandData } = brandDdo;
            if (!image) throw { message: 'Не загружена фотография' };

            const company = await this.companiesService.getOneByTitle(companyTitle);
            if (!company) throw { message: 'Компания не найдена' };

            const access = await this.companyAccessService.checkAccess(userId, company._id.toString());
            if (!access) throw { message: 'Нет доступа'};

            const sameBrand = await this.brandModel.findOne({
                title: brandDdo.title,
                company: company._id,
            });
            if (sameBrand) throw { message: 'Такой бренд уже существует' };

            const [ icon ] = await this.imageLoaderService.load(
                [image],
                FolderType.BRAND,
                userId.toString(),
                this.defaultBrandSizes,
            )

            return (await this.brandModel.create({
                ...brandData,
                icon: icon.id,
                company: company._id
            }))
                .populate(['icon', 'company']);
        }
        catch (e) {
            throw new BadRequestException(e).getResponse();
        }
    }

    async delete (userId: string, brandId: string) {
        try {
            const brand: BrandDocument = await this.brandModel
                .findOne({ _id: brandId })
                .populate('company')
                .exec();

            if (!brand) { throw {message: 'Такого бренда не существует'} }
            const access = await this.companyAccessService.checkAccess(userId, brand.company._id.toString());
            if (!access) { throw {message: 'Нету доступа'} }

            return this.brandModel.deleteOne({ _id: brandId });
        }
        catch (e) {
            throw new BadRequestException(e).getResponse();
        }
    }

    async deleteManyWithoutAccessCheckByCompanyId (companyId: string) {
        try {
            const deleted = await this.brandModel.deleteMany({ company: companyId });
            return deleted;
        }
        catch (e) {
            throw new BadRequestException(e).getResponse();
        }
    }

    async getAll (options: ISearchOptions, projections: Projections<BrandDocument> = {}): Promise<IMultiResponse<BrandDocument>> {
        try {
            const count: number = await this.brandModel.count() as number;
            const brands: BrandDocument[] = await this.brandModel
                .find({}, projections)
                .skip(options.offset)
                .limit(options.limit)
                .sort(getSortParams(options.sort));

            return {
                list: brands,
                count,
                options
            }
        }
        catch (e) {
            throw new BadRequestException(e).getResponse();
        }
    }

    async getByCompany(title: string, options: ISearchOptions = {}, projections: Projections<BrandDocument> = {}): Promise<IMultiResponse<BrandDocument>> {
        try {
            const company = await this.companiesService.getOneByTitle(title);
            if (!company) {
                throw { message: 'Компания не найдена' };
            }
            const count: number = await this.brandModel.find({
                company: company._id
            }).count();

            const brands = await this.brandModel.find({
                company: company._id
            }, projections)
                .skip(options.offset)
                .limit(options.limit)
                .sort(getSortParams(options.sort))
                .populate(['company', 'icon'])
                .exec();

            return {
                list: brands,
                count,
                options
            }
        }
        catch (e) {
            throw new BadRequestException(e).getResponse();
        }
    }
}