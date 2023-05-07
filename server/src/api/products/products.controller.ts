import {
    Body,
    Controller,
    Post,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
    UsePipes
} from "@nestjs/common";
import {ProductDto} from "./dto/product.dto";
import {ProductsService} from "./products.service";
import {Cookies} from "../../decorators/cookies.decorator";
import {ACCESS_TOKEN_NAME} from "../../.constants";
import {AccessTokenGuard} from "../../guards/access-token-guard.service";
import {ValidationPipe} from "../../pipes/validation.pipe";
import {FileFieldsInterceptor} from "@nestjs/platform-express";

@Controller('/api/products')
export class ProductsController {

    constructor(private productsService: ProductsService) {}

    @Post('/create')
    @UseGuards(AccessTokenGuard)
    @UsePipes(ValidationPipe)
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'generalImage', maxCount: 1 },
        { name: 'images', maxCount: 20 },
    ]))
    create (@UploadedFiles() files: { [key: string]: Express.Multer.File[] },
            @Body() productDto: ProductDto,
            @Cookies(ACCESS_TOKEN_NAME) accessToken: string) {
        return this.productsService.create(productDto, files, accessToken);
    }

    @Post('/delete')
    delete () {

    }

}