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
            @UserVerified() user: IUserVerifiedData) {
        return this.brandsService.create(user.id, brandDto, files['image']?.[0]);
    }

    @Post('/delete')
    @UseGuards(AccessTokenGuard)
    delete (@UserVerified() user: IUserVerifiedData,
            @Body() body: { brandId: string }) {
        return this.brandsService.delete(user.id, body.brandId);
    }

    @Get('/all')
    @UseGuards(AccessTokenGuard)
    getAll (@Query('limit') limit: number = 10,
            @Query('offset') offset: number = 0,
            @Query('sort') sort: string = '') {
        return this.brandsService.getAll({ limit: Number(limit), offset: Number(offset), sort: sort.split(',') })
    }

    @Get('/byCompany')
    @UseGuards(AccessTokenGuard)
    getByCompany(@Query('title') title: string,
                 @UserVerified() user: IUserVerifiedData,
                 @Query('limit') limit: number = 10,
                 @Query('offset') offset: number = 0,
                 @Query('sort') sort: string = '') {
        return this.brandsService.getByCompany(title, { limit: Number(limit), offset: Number(offset), sort: sort.split(',')});
    }

}