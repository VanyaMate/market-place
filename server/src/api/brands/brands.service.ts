import {BadRequestException, HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {BrandDto} from "./dto/brand.dto";
import {Model, Types} from "mongoose";
import {FileSystemService, FileType} from "../../fileSystem/file-system.service";
import {InjectModel} from "@nestjs/mongoose";
import {Brand, BrandDocument} from "./schemas/brand.schema";
import {ISearchOptions} from "../../interfaces/search.interfaces";

@Injectable()
export class BrandsService {

    constructor(@InjectModel(Brand.name) private brandModel: Model<Brand>,
                private fileSystemService: FileSystemService) {}

    async create (brandDdo: BrandDto, image: Express.Multer.File, userId: Types.ObjectId) {
        try {
            if (!image) throw { message: 'Не загружена фотография' }
            const generalImagePath = this.fileSystemService.writeFile(FileType.IMAGE, image);
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