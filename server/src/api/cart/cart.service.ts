import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Cart, CartDocument, CartSchema, ICartProduct} from "./schema/cart.schema";
import {Model} from "mongoose";

@Injectable()
export class CartService {

    constructor(@InjectModel(Cart.name) private cartModel: Model<Cart>) {}

    async resetCart (userId: string) {
        const cart = await this.cartModel.findOne({ user: userId }).exec();
        cart.products = [];
        return await cart.save();
    }

    async createCart (userId: string) {
        const cart = await this.cartModel.create({
            user: userId,
            products: []
        });

        return cart;
    }

    async getCart (userId: string) {
        try {
            const cart = await this.cartModel
                .findOne({ user: userId }, ['products.product', 'products.amount'])
                .populate('products.product')
                .exec();
            return cart.products;
        }
        catch (e) {
            return new BadRequestException(e)
        }
    }

    async addToCart (userId: string, product: { product: string, amount: number }) {
        const cart = await this.cartModel.findOne({ user: userId }).exec();
        cart.products.push(product);
        return cart.save();
    }

}
