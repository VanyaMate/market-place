import {Injectable} from "@nestjs/common";
import * as jwt from 'jsonwebtoken';
import {ConfigService} from "@nestjs/config";
import {JWT_SECRET_KEY} from "../../../env.constants";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from 'mongoose';
import {User, UserDocument} from "../user/schemas/user.schema";
import {Token} from "./schemas/token.schema";

export interface ITokenData {
    id: string,
    sessionKey: string,
}

@Injectable()
export class TokensService {

    constructor(private config: ConfigService,
                @InjectModel(Token.name) private tokenModel: Model<Token>) {}

    async generateTokenToUser (userId: string, sessionKey: string): Promise<string> {
        return jwt.sign({id: userId, sessionKey: sessionKey}, this.config.get<string>(JWT_SECRET_KEY), { expiresIn: '7d' });
    }

    verifyToken (token: string): ITokenData {
        return jwt.verify(token, this.config.get<string>(JWT_SECRET_KEY)) as ITokenData;
    }

}

