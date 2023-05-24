import {TokensService} from "../tokens/tokens.service";
import {BadRequestException, Injectable, UnauthorizedException} from "@nestjs/common";
import {UserService} from "../user/user.service";
import {UserLoginDto} from "./dto/user-login.dto";
import {UsersService} from "../users/users.service";
import * as bcrypt from 'bcrypt';
import {UserPrivateDataDto} from "../user/dto/user-private-data.dto";
import {CartService} from "../cart/cart.service";

@Injectable()
export class AuthService {

    constructor (private tokenService: TokensService,
                 private userService: UserService,
                 private usersService: UsersService,
                 private cartService: CartService) {}

    async registration (userLoginDto: UserLoginDto): Promise<[UserPrivateDataDto, string]> {
        try {
            const candidate = (await this.usersService.findByEmail(userLoginDto.email)).users[0];
            if (candidate) {
                throw { message: 'Эта почта уже занята' }
            }
            const user = await this.userService.create(userLoginDto);
            const cart = await this.cartService.createCart(user._id.toString());
            const token = await this.tokenService.generateTokenToUser(user);
            return [ new UserPrivateDataDto({...user.toObject(), cart}), token ];
        }
        catch (e) {
            throw new BadRequestException(e);
        }
    }

    async login (userLoginDto: UserLoginDto): Promise<[UserPrivateDataDto, string]> {
        try {
            const candidate = (await this.usersService.findByEmail(userLoginDto.email)).users[0];
            if (candidate && await bcrypt.compare(userLoginDto.password, candidate.password)) {
                const token = await this.tokenService.generateTokenToUser(candidate);
                const cart = await this.cartService.getCart(candidate._id.toString());
                return [ new UserPrivateDataDto({...candidate.toObject(), cart}), token ];
            }

            throw { message: 'Ошибка авторизации' }
        }

        catch (e) {
            throw new UnauthorizedException(e);
        }
    }

    async logout (accessToken: string) {

    }

}