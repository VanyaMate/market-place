import {Inject, Injectable} from "@nestjs/common";
import * as jwt from 'jsonwebtoken';
import {ConfigService} from "@nestjs/config";
import {JWT_SECRET_KEY} from "../../env.constants";
import {User} from "../user/user.entity";
import {TOKENS_REPOSITORY} from "../../database/database.constants";
import {ObjectId, Repository} from "typeorm";
import {Token} from "./token.entity";

@Injectable()
export class TokensService {

    constructor(private config: ConfigService,
                @Inject(TOKENS_REPOSITORY) private tokenRepository: Repository<Token>) {}

    async generateTokenToUser (user: User): Promise<string> {
/*        const token = this.tokenRepository.create({
            token: jwt.sign({id: user.id}, this.config.get<string>(JWT_SECRET_KEY), { expiresIn: '7d' }),
            user: user.id
        })*/
        const token = new Token();
        token.token = jwt.sign({id: user.id}, this.config.get<string>(JWT_SECRET_KEY), { expiresIn: '7d' });
        token.user = new ObjectId(user.id);

        await this.tokenRepository.manager.save(token);

        return token.token;
    }

    verifyToken (token: string): { id: string } {
        return jwt.verify(token, this.config.get<string>(JWT_SECRET_KEY)) as { id: string };
    }

}

