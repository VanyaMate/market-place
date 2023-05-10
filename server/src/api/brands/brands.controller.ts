import {
    Body,
    Controller, Get,
    Post, Query,
    UploadedFile,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
    UsePipes
} from "@nestjs/common";
import {BrandsService} from "./brands.service";
import {AccessTokenGuard} from "../../guards/access-token-guard.service";
import {ValidationPipe} from "../../pipes/validation.pipe";
import {FileFieldsInterceptor} from "@nestjs/platform-express";
import {BrandDto} from "./dto/brand.dto";
import {IUserVerifiedData, UserVerified} from "../../decorators/user-verified.decorator";

@Controller('/api/brands')
export class BrandsController {

    constructor(private brandsService: BrandsService) {}

    @Post('/create')
    @UseGuards(AccessTokenGuard)
    @UsePipes(ValidationPipe)
    @UseInterceptors(new (FileFieldsInterceptor([
        { name: 'image', maxCount: 1 }
    ])))
    create (@UploadedFiles() files: { [key: string]: Express.Multer.File[] },
            @Body() brandDto: BrandDto,
            @UserVerified() userVerified: IUserVerifiedData) {
        return this.brandsService.create(brandDto, files['image']?.[0], userVerified.user._id);
    }

    @Post('/delete')
    delete () {
        return this.brandsService.delete();
    }

    @Get('/all')
    @UseGuards(AccessTokenGuard)
    getAll (@Query('limit') limit: number = 10,
            @Query('offset') offset: number = 0) {
        return this.brandsService.getAll({ limit: Number(limit), offset: Number(offset) })
    }

}