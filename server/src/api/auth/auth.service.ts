import {TokensService} from "../tokens/tokens.service";
import {Injectable} from "@nestjs/common";
import {UserService} from "../user/user.service";
import {UserLoginDto} from "./dto/user-login.dto";
import {User} from "../user/user.entity";

@Injectable()
export class AuthService {

    constructor (private tokenService: TokensService,
                 private userService: UserService) {}

    async registration (userLoginDto: UserLoginDto): Promise<[User, string]> {
        const user = await this.userService.create(userLoginDto);
        const token = await this.tokenService.generateTokenToUser(user);
        return [ user, token ];
    }

    async login (userLoginDto: UserLoginDto) {

    }

    async logout (accessToken: string) {

    }

}