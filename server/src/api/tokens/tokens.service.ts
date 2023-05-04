import {Inject, Injectable} from "@nestjs/common";
import * as jwt from 'jsonwebtoken';
import {ConfigService} from "@nestjs/config";
import {JWT_SECRET_KEY} from "../../env.constants";
import {User} from "../user/user.entity";
import {TOKENS_REPOSITORY} from "../../database/database.constants";
import {Repository} from "typeorm";
import {Token} from "./token.entity";

@Injectable()
export class TokensService {

    constructor(private config: ConfigService,
                @Inject(TOKENS_REPOSITORY) private tokenRepository: Repository<Token>) {}

    async generateTokenToUser (user: User): Promise<string> {
        const token = this.tokenRepository.create({
            token: jwt.sign({}, this.config.get<string>(JWT_SECRET_KEY), { expiresIn: '7d' }),
            user,
        })

        await this.tokenRepository.manager.save(token);

        return token.token;
    }

    verifyToken (token: string): boolean {
        return !!jwt.verify(token, this.config.get<string>(JWT_SECRET_KEY))
    }

}

