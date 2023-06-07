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
        return cart.save().then((cart) => cart.products);
    }

    async create (userId: string) {
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
        const cart = await this.cartModel
            .findOne({ user: userId })
            .exec();
        const cartItem = cart.products.filter((cartProduct) => cartProduct.product.toString() === product.product)[0];

        if (cartItem) {
            cartItem.amount += product.amount;
        } else {
            cart.products.push(product);
        }
        return cart.save().then(doc => doc.populate('products.product')).then((data) => data.products);
    }

    async changeCart (userId: string, product: { product: string, amount: number }) {
        const cart = await this.cartModel
            .findOne({ user: userId })
            .populate('products.product')
            .exec();
        this._updateCartItem(cart, product);
        return cart.save().then(doc => doc.populate('products.product')).then((data) => data.products);
    }

    private _updateCartItem (cart, product: { product: string, amount: number }) {
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
