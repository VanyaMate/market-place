import {TokensService} from "../tokens/tokens.service";
import {BadRequestException, Injectable, UnauthorizedException} from "@nestjs/common";
import {UserService} from "../user/user.service";
import {UserLoginDto} from "./dto/user-login.dto";
import {UsersService} from "../users/users.service";
import * as bcrypt from 'bcrypt';
import {UserPrivateDataDto} from "../user/dto/user-private-data.dto";
import {CartService} from "../cart/cart.service";
import {SessionService} from "../session/session.service";

@Injectable()
export class AuthService {

    constructor (private tokenService: TokensService,
                 private userService: UserService,
                 private usersService: UsersService,
                 private cartService: CartService,
                 private sessionService: SessionService) {}

    async registration (userLoginDto: UserLoginDto): Promise<[UserPrivateDataDto, string]> {
        console.log(userLoginDto);
        try {
            const candidate = (await this.usersService.findByEmail(userLoginDto.email)).list[0];
            if (candidate) {
                throw { message: 'Эта почта уже занята' }
            }
            const user = await this.userService.create(userLoginDto);
            const cart = await this.cartService.create(user._id.toString());
            const sessionKey = await this.sessionService.create(user._id.toString());
            const token = await this.tokenService.generateTokenToUser(user._id.toString(), sessionKey);
            return [ new UserPrivateDataDto({...user.toObject(), cart}), token ];
        }
        catch (e) {
            console.log(e);
            throw new BadRequestException(e);
        }
    }

    async login (userLoginDto: UserLoginDto): Promise<[UserPrivateDataDto, string]> {
        try {
            const candidate = (await this.usersService.findByEmail(userLoginDto.email)).list[0];
            if (candidate && await bcrypt.compare(userLoginDto.password, candidate.password)) {
                return this.getPrivateUserData(candidate._id.toString());
            }

            throw { message: 'Ошибка авторизации' }
        }
        catch (e) {
            throw new UnauthorizedException(e);
        }
    }

    async logout (accessToken: string) {

    }

    async getPrivateUserData (userId: string): Promise<[UserPrivateDataDto, string]> {
        try {
            const user = await this.usersService.findById(userId);
            const sessionKey = await this.sessionService.findByUserId(userId);
            const token = await this.tokenService.generateTokenToUser(userId, sessionKey);
            const cart = await this.cartService.getCart(userId);
            return [ new UserPrivateDataDto({...user.toObject(), cart}), token ];
        }
        catch (e) {
            throw new UnauthorizedException(e);
        }
    }

}