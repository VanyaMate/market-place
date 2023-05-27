import {FolderType} from "../../file-service/file-service.service";
import {ImageService} from "../../image-service/image.service";
import {ImageSize} from "../../sharp-service/sharp.service";
import {InjectModel} from "@nestjs/mongoose";
import {Image} from "./schemas/image.schema";
import {Model} from "mongoose";

export class ImageLoaderService {

    constructor(private imageService: ImageService,
                @InjectModel(Image.name) private imageModel: Model<Image>) {}

    async load (images: Express.Multer.File[], folderType: FolderType, userId: string, sizes: ImageSize[]) {
        return await Promise.all(images.map(async (image) => {
            const imagePath = await this.imageService.saveOptimizedImage(
                image.buffer,
                folderType,
                userId,
                sizes
            );
            await this.imageModel.create({
                title: image.filename,
                path: imagePath,
                type: folderType,
                user: userId,
            });
            return imagePath;
        }));
    }

}