import {BadRequestException, Injectable} from "@nestjs/common";
import {ProductDto} from "./dto/product.dto";
import {InjectModel} from "@nestjs/mongoose";
import {Product} from "./schemas/product.schema";
import {Model} from "mongoose";
import {TokensService} from "../tokens/tokens.service";
import {UsersService} from "../users/users.service";
import {FileSystemService, FileType} from "../../fileSystem/file-system.service";
import {UserPublicDataDto} from "../user/dto/user-public-data.dto";

@Injectable()
export class ProductsService {

    constructor(@InjectModel(Product.name) private productModel: Model<Product>,
                private tokensService: TokensService,
                private usersService: UsersService,
                private fileSystemService: FileSystemService) {}

    async create (productDto: ProductDto, files: { [key: string]: Express.Multer.File[] }, accessToken: string) {
        try {
            const { generalImage, images } = files;
            const { id } = this.tokensService.verifyToken(accessToken);
            const user = await this.usersService.findById(id, { email: true, firstName: true, lastName: true });
            const generalImagePath = this.fileSystemService.writeFile(FileType.IMAGE, generalImage[0]);
            const imagesPaths = images.map((image) => this.fileSystemService.writeFile(FileType.IMAGE, image));
            const product = await this.productModel.create({
                ...productDto,
                author: user.users[0],
                generalImage: generalImagePath,
                images: imagesPaths,
            });

            return product;
        }
        catch (e) {
            throw new BadRequestException({ message: 'Ошибка добавления товара' });
        }
    }

    delete () {

    }

}