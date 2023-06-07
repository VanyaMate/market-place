import {BadRequestException, Injectable} from "@nestjs/common";
import {ProductDto} from "./dto/product.dto";
import {InjectModel} from "@nestjs/mongoose";
import {Product, ProductDocument} from "./schemas/product.schema";
import {Model, Types} from "mongoose";
import {IProductSearchProps} from "../../interfaces/products.interface";
import {ISearchOptions, Projections} from "../../interfaces/search.interfaces";
import {Brand, BrandDocument} from "../brands/schemas/brand.schema";
import {ImageSize} from "../../services/sharp-service/sharp.service";
import {randomUUID} from "crypto";
import {FolderType} from "../../services/file-service/file-service.service";
import {ImageService} from "../../services/image-service/image.service";
import {ImageLoaderService} from "../image-loader/image-loader.service";
import {IMultiResponse} from "../../interfaces/responses.interface";
import {getSortParams} from "../../helpers/utils";

@Injectable()
export class ProductsService {

    private defaultOptimizedImageSizes: ImageSize[] = [
        { width: 100, height: 100 },
        { width: 200, height: 200 },
        { width: 400, height: 400 },
        { width: 800, height: 800 },
    ];

    constructor(@InjectModel(Product.name) private productModel: Model<Product>,
                @InjectModel(Brand.name) private brandModel: Model<Brand>,
                private imageLoaderService: ImageLoaderService) {}

    async create (userId: string, productDto: ProductDto, files: { [key: string]: Express.Multer.File[] }): Promise<ProductDocument> {
        try {
            const { generalImage, images } = files;

            const brand = await this.brandModel.findOne({ title: productDto.brand });
            if (!brand) {
                throw {message: 'Неверно указан бренд товара'};
            }

            const generalImageDatas = await this.imageLoaderService.load(
                generalImage,
                FolderType.PRODUCT,
                userId.toString(),
                this.defaultOptimizedImageSizes
            )

            const imagesPaths = await this.imageLoaderService.load(
                images,
                FolderType.PRODUCT,
                userId.toString(),
                this.defaultOptimizedImageSizes
            );

            return await (await this.productModel.create({
                ...productDto,
                author: userId,
                generalImage: generalImageDatas[0].id,
                images: imagesPaths.map((image) => image.id),
                brand: brand,
            }))
                .populate([ 'brand', 'brand.image', 'generalImage', 'images' ])
        }
        catch (e) {
            throw new BadRequestException(e);
        }
    }

    async delete () {

    }

    async getAll (options: ISearchOptions, projections: Projections<ProductDocument> = {}): Promise<IMultiResponse<ProductDocument>> {
        try {
            const count = await this.productModel
                .find({}, projections)
                .count();

            const products = await this.productModel
                .find({}, projections)
                .skip(options.offset)
                .limit(options.limit)
                .sort(getSortParams(options.sort))

            return {
                list: products,
                options,
                count
            }
        }
        catch (e) {
            throw new BadRequestException({ message: 'Ошибка поиска' });
        }
    }

    async findBy (props: IProductSearchProps, options: ISearchOptions, projections: Projections<ProductDocument> = {}): Promise<IMultiResponse<ProductDocument>> {
        try {
            /**
             * TODO: Сделать поиск не только в начале по title
             */

            const filter = {};

            if (props.title) filter['title'] = new RegExp(`^${ props.title }`, 'gi');
            if (props.brand) {
                const brand = (await this.brandModel.findOne({ title: props.brand })) as BrandDocument;
                filter['brand'] = brand._id;
            }

            const count = await this.productModel.find(filter).count();

            let productsQuery = this.productModel
                .find(filter, projections)
                .skip(options.offset)
                .limit(options.limit)
                .sort(getSortParams(options.sort))

            const products = await productsQuery.exec();

            return {
                list: products,
                options,
                count,
            }
        }
        catch (e) {
            throw new BadRequestException({ message: 'Ошибка поиска' });
        }
    }

    async getById (id: string): Promise<ProductDocument> {
        return await this.productModel.findById(id).exec();
    }

}