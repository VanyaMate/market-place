import {
    Body,
    Controller, Get, NestInterceptor, Param,
    Post, Query,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
    UsePipes
} from "@nestjs/common";
import {ProductDto} from "./dto/product.dto";
import {ProductsService} from "./products.service";
import {AccessTokenGuard} from "../../guards/access-token-guard.service";
import {ValidationPipe} from "../../pipes/validation.pipe";
import {FileFieldsInterceptor} from "@nestjs/platform-express";
import {IUserVerifiedData, UserVerified} from "../../decorators/user-verified.decorator";

@Controller('/api/products')
export class ProductsController {

    constructor(private productsService: ProductsService) {}

    /**
     * TODO: Проверять на доступ к бренду
     *
     */
    @Post('/create')
    @UseGuards(AccessTokenGuard)
    @UsePipes(ValidationPipe)
    @UseInterceptors(new (FileFieldsInterceptor([
        { name: 'generalImage', maxCount: 1 },
        { name: 'images', maxCount: 20 },
    ])))
    create (@UploadedFiles() files: { [key: string]: Express.Multer.File[] },
            @Body() productDto: ProductDto,
            @UserVerified() userVerified: IUserVerifiedData) {
        return this.productsService.create(productDto, files, userVerified.user._id);
    }

    @Post('/delete')
    delete () {

    }

    @Get('/all')
    getAll (@Query('limit') limit: number = 10,
            @Query('offset') offset: number = 0,
            @Query('sort') sort: string = '') {
        return this.productsService.getAll({limit: Number(limit), offset: Number(offset), sort: sort.split(',')});
    }

    @Get('/findBy')
    findBy (@Query('title') title: string = '',
            @Query('category') category: string = '',
            @Query('brand') brand: string = '',
            @Query('limit') limit: number = 10,
            @Query('offset') offset: number = 0,
            @Query('sort') sort: string = '') {
        return this.productsService.findBy(
            {title, category, brand},
            {limit: Number(limit), offset: Number(offset), sort: sort.split(',')}
        );
    }

    @Get('/id/:id')
    byId (@Param('id') id: string) {
        return this.productsService.getById(id);
    }

}