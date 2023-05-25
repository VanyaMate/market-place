import {BadRequestException, Injectable} from "@nestjs/common";
import {BrandDto} from "./dto/brand.dto";
import {Model, Types} from "mongoose";
import {FileSystemService, FileType} from "../../fileSystem/file-system.service";
import {InjectModel} from "@nestjs/mongoose";
import {Brand, BrandDocument} from "./schemas/brand.schema";
import {ISearchOptions} from "../../interfaces/search.interfaces";
import {ImageService} from "../../image-service/image.service";
import {FolderType} from "../../file-service/file-service.service";
import {ImageSize} from "../../sharp-service/sharp.service";

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
                private imageService: ImageService) {}

    async create (brandDdo: BrandDto, image: Express.Multer.File, userId: Types.ObjectId) {
        /**
         * TODO: Сделать невозможным делать одинаковые имена
         */

        try {
            if (!image) throw { message: 'Не загружена фотография' }
            const generalImagePath = await this.imageService.saveOptimizedImage(
                image.buffer,
                FolderType.BRAND,
                userId.toString(),
                this.defaultBrandSizes
            );
            const brand = await this.brandModel.create({
                ...brandDdo,
                author: userId,
                image: generalImagePath,
            })

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
}