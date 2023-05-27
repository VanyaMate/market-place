import {Injectable} from "@nestjs/common";
import {ProductsService} from "../products/products.service";
import {getRandomInt} from "../../helpers/utils";

@Injectable()
export class CompilationsService {

    constructor(private productsService: ProductsService) {}

    async getNewProducts (limit: number) {
        const products = await this.productsService
            .getAll({ limit: limit * 3, offset: 0, sort: ['date:desc']})

        return this._getRandomArrayElements(products.products, limit);
    }

    async getUserRecommendations (userId: string, limit: number) {
        /**
         * TODO: Пока что без рекомендаций.
         */
        const products = await this.productsService
            .getAll({ limit: limit * 3, offset: 0, sort: ['createdAt']})

        return this._getRandomArrayElements(products.products, limit);
    }

    async getProductRecommendations (productId: string, limit: number) {
        /**
         * TODO: Пока что без рекомендаций.
         */
        const products = await this.productsService
            .getAll({ limit: limit * 3, offset: 0, sort: ['createdAt']})

        return this._getRandomArrayElements(products.products, limit);
    }

    async getSales (limit: number) {
        /**
         * TODO: Сначала переделаю productsService и вернусь.
         */
        const products = await this.productsService
            .getAll({ limit: limit * 3, offset: 0, sort: ['discount:desc'] })

        return this._getRandomArrayElements(products.products, limit);
    }

    private _getRandomArrayElements (array: any[], amount: number): any[] {
        const randomElements: any[] = [];

        for (let i = 0; i < amount; i++) {
            if (array.length === 0) return randomElements;
            randomElements.push(array.splice(getRandomInt(0, array.length), 1)[0]);
        }

        return randomElements;
    }

}