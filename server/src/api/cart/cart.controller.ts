import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import {AccessTokenGuard} from "../../guards/access-token-guard.service";
import {IUserVerifiedData, UserVerified} from "../../decorators/user-verified.decorator";
import {Schema} from "mongoose";
import {CartService} from "./cart.service";
import * as mongoose from "mongoose";

@Controller('api/cart')
export class CartController {

    constructor (private cartService: CartService) {}

    /**
     * Временный метод. В дальнейшем корзина будет создаваться при создании пользователя.
     */
    @Post('/create')
    @UseGuards(AccessTokenGuard)
    createCart (@UserVerified() userAccess: IUserVerifiedData) {
        return this.cartService.createCart(userAccess.user._id.toString());
    }

    @Post('/reset')
    @UseGuards(AccessTokenGuard)
    resetCart (@UserVerified() userAccess: IUserVerifiedData) {
        return this.cartService.resetCart(userAccess.user._id.toString());
    }

    @Get('')
    @UseGuards(AccessTokenGuard)
    getCart (@UserVerified() userAccess: IUserVerifiedData) {
        return this.cartService.getCart(userAccess.user._id.toString());
    }

    @Post('/add')
    @UseGuards(AccessTokenGuard)
    addToCart(@UserVerified() userAccess: IUserVerifiedData,
              @Body('productId') productId: string,
              @Body('amount') amount: string = '1') {
        return this.cartService.addToCart(userAccess.user._id.toString(), {
            product: productId,
            amount: Number(amount)
        })
    }

}
