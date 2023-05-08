import {BadRequestException, Injectable} from "@nestjs/common";
import {BrandDto} from "./dto/brand.dto";
import {Model, Types} from "mongoose";
import {FileSystemService, FileType} from "../../fileSystem/file-system.service";
import {InjectModel} from "@nestjs/mongoose";
import {Brand} from "./schemas/brand.schema";

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
}