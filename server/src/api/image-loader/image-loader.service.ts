import {FolderType} from "../../file-service/file-service.service";
import {ImageService} from "../../image-service/image.service";
import {ImageSize} from "../../sharp-service/sharp.service";
import {InjectModel} from "@nestjs/mongoose";
import {Image, ImageDocument} from "./schemas/image.schema";
import {Model, Types} from "mongoose";

export interface ImageLoadResponse {
    path: string;
    id: Types.ObjectId;
}

export class ImageLoaderService {

    constructor(private imageService: ImageService,
                @InjectModel(Image.name) private imageModel: Model<Image>) {}

    async load (images: Express.Multer.File[], folderType: FolderType, userId: string, sizes: ImageSize[]): Promise<ImageLoadResponse[]> {
        return await Promise.all(images.map(async (image) => {
            const imagePath: string = await this.imageService.saveOptimizedImage(
                image.buffer,
                folderType,
                userId,
                sizes
            );
            const imageDocument: ImageDocument = await this.imageModel.create({
                title: image.filename,
                path: imagePath,
                type: folderType,
                user: userId,
            });
            const response: ImageLoadResponse = {
                path: imagePath,
                id: imageDocument._id,
            }
            return response;
        }));
    }

}