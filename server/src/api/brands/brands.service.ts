import {BadRequestException, Injectable} from "@nestjs/common";
import {BrandDto} from "./dto/brand.dto";
import {Model, Types} from "mongoose";
import {FileSystemService} from "../../services/fileSystem/file-system.service";
import {InjectModel} from "@nestjs/mongoose";
import {Brand, BrandDocument} from "./schemas/brand.schema";
import {ISearchOptions} from "../../interfaces/search.interfaces";
import {FolderType} from "../../services/file-service/file-service.service";
import {ImageSize} from "../../services/sharp-service/sharp.service";
import {ImageLoaderService} from "../image-loader/image-loader.service";
import {CompaniesService} from "../companies/companies.service";

@Injectable()
export class BrandsService {

    private defaultBrandSizes: ImageSize[] = [
        { width: 50, height: 50 },
        { width: 100, height: 100 },
        { width: 200, height: 200 },
        { width: 400, height: 400 },
    ];

    constructor(@InjectModel(Brand.name) private brandModel: Model<Brand>,
                private fileSystemService: FileSystemService,
                private imageLoaderService: ImageLoaderService,
                private companiesService: CompaniesService) {}

    async create (brandDdo: BrandDto, image: Express.Multer.File, userId: Types.ObjectId) {
        /**
         * TODO: Сделать невозможным делать одинаковые имена
         */

        const { companyTitle, ...brandData } = brandDdo;

        try {
            if (!image) throw { message: 'Не загружена фотография' }
            const company = await this.companiesService.getFullByTitle(userId.toString(), companyTitle);

            const [ icon ] = await this.imageLoaderService.load(
                [image],
                FolderType.BRAND,
                userId.toString(),
                this.defaultBrandSizes,
            )

            const brand = (await this.brandModel.create({
                ...brandData,
                author: userId,
                image: icon.id,
                company: company._id
            }))
                .populate(['image', 'company'])

            return brand;
        }
        catch (e) {
            console.log(e);
            throw new BadRequestException(e);
        }
    }

    async delete () {

    }

    async getAll (options: ISearchOptions, projections: { [key: string]: boolean } = {}) {
        try {
            const count: number = await this.brandModel.count() as number;
            const brands: BrandDocument[] = await this.brandModel
                .find({}, projections)
                .skip(options.offset)
                .limit(options.limit) as BrandDocument[];

            return {
                brands,
                count,
                options
            }
        }
        catch (e) {
            throw new BadRequestException(e);
        }
    }

    /**
     * TODO: Требуется рефакторинг ВСЕГО
     */
    async getByCompany(userId: string, title: string) {
        const company = await this.companiesService.getFullByTitle(userId, title);
        if (!company) {
            throw new BadRequestException('Компания не найдена');
        }
        const brands = await this.brandModel.find({
            company: company._id
        })
            .populate('company')
            .exec();

        return brands;
    }
}