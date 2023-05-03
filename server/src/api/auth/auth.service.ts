import {TokensService} from "../tokens/tokens.service";
import {Injectable} from "@nestjs/common";

@Injectable()
export class AuthService {

    constructor (private tokenService: TokensService) {}

    async registration () {
        return this.tokenService.generateToken();
    }

    async login (email: string, password: string) {

    }

    async logout (authToken: string) {

    }

}