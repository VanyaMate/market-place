import {Controller, Get, Query} from "@nestjs/common";
import {TokenService} from "../../services/token/token.service";

@Controller('/api/v2/token')
export class TokenManagerController {

    constructor(private tokenService: TokenService) {}

    @Get('/reset')
    reset (@Query('id') id: string) {
        return this.tokenService.reset(id);
    }

}