import {BadRequestException, Injectable} from "@nestjs/common";
import {ProductDto} from "./dto/product.dto";
import {InjectModel} from "@nestjs/mongoose";
import {Product, ProductDocument} from "./schemas/product.schema";
import {Model, Types} from "mongoose";
import {TokensService} from "../tokens/tokens.service";
import {UsersService} from "../users/users.service";
import {FileSystemService, FileType} from "../../fileSystem/file-system.service";
import {IProductSearchProps} from "../../interfaces/products.interface";
import {ISearchOptions} from "../../interfaces/search.interfaces";
import {Brand, BrandDocument} from "../brands/schemas/brand.schema";

@Injectable()
export class ProductsService {

    constructor(@InjectModel(Product.name) private productModel: Model<Product>,
                @InjectModel(Brand.name) private brandModel: Model<Brand>,
                private fileSystemService: FileSystemService) {}

    async create (productDto: ProductDto, files: { [key: string]: Express.Multer.File[] }, userId: Types.ObjectId) {
        try {
            const { generalImage, images } = files;
            const generalImagePath = this.fileSystemService.writeFile(FileType.IMAGE, generalImage[0]);
            const imagesPaths = (images || []).map((image) => this.fileSystemService.writeFile(FileType.IMAGE, image));
            const brand = await this.brandModel.findOne({ title: productDto.brand });
            if (!brand) {
                throw {message: 'Неверно указан бренд товара'};
            }

            const product = (await this.productModel.create({
                ...productDto,
                author: userId,
                generalImage: generalImagePath,
                images: imagesPaths,
                brand: brand,
            })).populate('brand', ['title', 'description', 'image']);

            return product;
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
            const count = await this.productModel
                .find({}, projections)
                .count();

            const products = await this.productModel
                .find({}, projections)
                .skip(options.offset)
                .limit(options.limit)

            return {
                products,
                options,
                count
            }
        }
        catch (e) {
            console.log(e);
            throw new BadRequestException({ message: 'Ошибка поиска' });
        }
    }

    async findBy (props: IProductSearchProps, options: ISearchOptions, projections: { [key: string]: boolean } = {}) {
        try {
            /**
             * TODO: Сделать поиск не только в начале по title
             */
            const filter = { $and: [] };
            if (props.title) {
                filter.$and.push({ title: { $in: [ new RegExp(`^${ props.title }`, 'gi') ] } })
            }

            const brand = (await this.brandModel.findOne({ title: props.brand })) as BrandDocument;

            if (props.brand) {
                if (!brand) return {
                    products: [],
                    options,
                }
                filter.$and.push({ brand: brand._id })
            }

            const count = await this.productModel.find(filter).count();

            let productsQuery = this.productModel
                .find(filter, projections)
                .skip(options.offset)
                .limit(options.limit)

            /**
             *
             *  TODO: Нужен механ для удобной сортировки  и фильтрации. Везде одни и те же запросы
             */
            if (props.sortByPrice === 'asc') {
                productsQuery = productsQuery.sort({ price: 'asc' })
            } else if (props.sortByPrice === 'desc') {
                productsQuery = productsQuery.sort({ price: 'desc' })
            }

            if (props.sortByTitle === 'asc') {
                productsQuery = productsQuery.sort({ title: 'asc' })
            } else if (props.sortByTitle === 'desc') {
                productsQuery = productsQuery.sort({ title: 'desc' })
            }

            const products = await productsQuery.exec();

            return {
                products,
                options,
                count,
            }
        }
        catch (e) {
            console.log(e);
            throw new BadRequestException({ message: 'Ошибка поиска' });
        }
    }

}