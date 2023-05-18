import {Controller, Get, Param, Query, UseGuards} from "@nestjs/common";
import {AccessTokenGuard} from "../../guards/access-token-guard.service";
import {IUserVerifiedData, UserVerified} from "../../decorators/user-verified.decorator";
import {CompilationsService} from "./compilations.service";

@Controller('/api/compilations')
export class CompilationsController {

    constructor(private compilationsService: CompilationsService) {}

    @Get('/new')
    getNew(@Query('limit') limit: number = 10) {
        return this.compilationsService.getNewProducts(limit);
    }

    @Get('/user-recommendations')
    @UseGuards(AccessTokenGuard)
    getUserRecommendations(@Query('limit') limit: number = 10,
                           @UserVerified() userData: IUserVerifiedData) {
        return this.compilationsService.getUserRecommendations(
            userData.user._id.toString(),
            limit
        )
    }

    @Get('/product-recommendations')
    getProductRecommendations (@Query('limit') limit: number = 10,
                               @Query('productId') productId: string) {
        return this.compilationsService.getProductRecommendations(
            productId, limit
        )
    }

    @Get('/sales')
    getSales(@Query('limit') limit: number = 10) {
        return this.compilationsService.getSales(limit);
    }

}