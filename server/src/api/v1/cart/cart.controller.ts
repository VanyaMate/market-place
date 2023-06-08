import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import {AccessTokenGuard} from "../../../guards/access-token-guard.service";
import {IUserVerifiedData, UserVerified} from "../../../decorators/user-verified.decorator";
import {CartService} from "./cart.service";

@Controller('api/cart')
export class CartController {

    constructor (private cartService: CartService) {}

    /**
     * TODO: Временный метод. В дальнейшем корзина будет создаваться при создании пользователя.
     */
    @Post('/create')
    @UseGuards(AccessTokenGuard)
    createCart (@UserVerified() user: IUserVerifiedData) {
        return this.cartService.create(user.id);
    }

    @Post('/reset')
    @UseGuards(AccessTokenGuard)
    resetCart (@UserVerified() user: IUserVerifiedData) {
        return this.cartService.resetCart(user.id);
    }

    @Get('')
    @UseGuards(AccessTokenGuard)
    getCart (@UserVerified() user: IUserVerifiedData) {
        return this.cartService.getCart(user.id);
    }

    @Post('/add')
    @UseGuards(AccessTokenGuard)
    addToCart(@UserVerified() user: IUserVerifiedData,
              @Body('productId') productId: string,
              @Body('amount') amount: string = '1') {
        return this.cartService.addToCart(user.id, {
            product: productId,
            amount: Number(amount)
        })
    }

    @Post('/change')
    @UseGuards(AccessTokenGuard)
    changeCart(@UserVerified() user: IUserVerifiedData,
               @Body('productId') productId: string,
               @Body('amount') amount: string = '0') {
        return this.cartService.changeCart(user.id, {
            product: productId,
            amount: Number(amount)
        })
    }

}
