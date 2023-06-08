import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Cart, ICartProduct} from "./schema/cart.schema";
import {Model} from "mongoose";

@Injectable()
export class CartService {

    constructor(@InjectModel(Cart.name) private cartModel: Model<Cart>) {}

    async resetCart (userId: string): Promise<ICartProduct[]> {
        try {
            const cart = await this.cartModel.findOne({ user: userId }).exec();
            if (!cart) { throw { message: 'Корзины для этого пользователя не найдено' } }

            cart.products = [];
            return cart.save().then((cart) => cart.products);
        }
        catch (e) {
            throw new BadRequestException(e).getResponse();
        }
    }

    async create (userId: string): Promise<ICartProduct[]> {
        try {
            const cart = await this.cartModel.create({
                user: userId,
                products: []
            });

            return cart.products;
        }
        catch (e) {
            throw new BadRequestException(e).getResponse();
        }
    }

    async delete (userId: string): Promise<boolean> {
        try {
            const deleted = await this.cartModel.deleteOne({
                user: userId
            });

            return deleted.deletedCount > 0;
        }
        catch (e) {
            throw new BadRequestException(e).getResponse();
        }
    }

    async getCart (userId: string): Promise<ICartProduct[]> {
        try {
            const cart = await this.cartModel
                .findOne({ user: userId }, ['products.product', 'products.amount'])
                .populate('products.product')
                .exec();

            if (cart.products) {
                return cart.products;
            } else {
                throw { message: 'Корзины для этого пользователя не найдено' };
            }
        }
        catch (e) {
            throw new BadRequestException(e).getResponse();
        }
    }

    async addToCart (userId: string, product: ICartProduct): Promise<ICartProduct[]> {
        try {
            const cart = await this.cartModel
                .findOne({ user: userId })
                .exec();

            if (!cart) { throw { message: 'Корзины для этого пользователя не найдено' } }

            const cartItem = cart.products.filter((cartProduct) => cartProduct.product.toString() === product.product)[0];

            if (cartItem) {
                cartItem.amount += product.amount;
            } else {
                cart.products.push(product);
            }

            return cart.save().then(doc => doc.populate('products.product')).then((data) => data.products);
        }
        catch (e) {
            throw new BadRequestException(e).getResponse();
        }
    }

    async changeCart (userId: string, product: ICartProduct): Promise<ICartProduct[]> {
        try {
            const cart = await this.cartModel
                .findOne({ user: userId })
                .populate('products.product')
                .exec();

            if (!cart) { throw { message: 'Корзины для этого пользователя не найдено' } }

            this._updateCartItem(cart, product);
            return cart.save().then(doc => doc.populate('products.product')).then((data) => data.products);
        }
        catch (e) {
            throw new BadRequestException(e).getResponse();
        }
    }

    private _updateCartItem (cart, product: ICartProduct): void {
        cart.products.forEach((cartProduct, index) => {
            if (cartProduct.product._id.toString() === product.product) {
                if (product.amount) {
                    cartProduct.amount = product.amount;
                } else {
                    cart.products.splice(index, 1);
                }
                return;
            }
        })
    }

}
