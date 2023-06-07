import {Body, Controller, Post, UploadedFiles, UseGuards, UseInterceptors} from "@nestjs/common";
import {AccessTokenGuard} from "../../guards/access-token-guard.service";
import {FileFieldsInterceptor} from "@nestjs/platform-express";
import {FolderType} from "../../services/file-service/file-service.service";
import {ImageLoaderService} from "./image-loader.service";
import {IUserVerifiedData, UserVerified} from "../../decorators/user-verified.decorator";

@Controller('/api/image')
export class ImageLoaderController {

    constructor(private imageLoaderService: ImageLoaderService) {}


    @Post('/load')
    @UseGuards(AccessTokenGuard)
    @UseInterceptors(new (FileFieldsInterceptor([
        { name: 'image', maxCount: 20 },
    ])))
    async load (@UploadedFiles() files: { [key: string]: Express.Multer.File[] },
          @Body() folderType: { type: FolderType },
          @UserVerified() user: IUserVerifiedData) {
        /**
         * TODO: Безопасность
         */
        await this.imageLoaderService.load(
            files['image'],
            folderType.type,
            user.id,
            []
        );
    }

    delete () {

    }

}