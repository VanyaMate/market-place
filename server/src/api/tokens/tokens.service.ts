import {Injectable} from "@nestjs/common";
import * as jwt from 'jsonwebtoken';
import {ConfigService} from "@nestjs/config";
import {JWT_SECRET_KEY} from "../../env.constants";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from 'mongoose';
import {UserDocument} from "../user/schemas/user.schema";
import {Token} from "./schemas/token.schema";

@Injectable()
export class TokensService {

    constructor(private config: ConfigService,
                @InjectModel(Token.name) private tokenModel: Model<Token>) {}

    async generateTokenToUser (user: UserDocument): Promise<string> {
        const token = new this.tokenModel({
            token: jwt.sign({id: user._id, secretKey: user.secretKey}, this.config.get<string>(JWT_SECRET_KEY), { expiresIn: '7d' }),
            user: user._id
        })

        return (await token.save()).token;
    }

    verifyToken (token: string): { id: string, secretKey: string } {
        return jwt.verify(token, this.config.get<string>(JWT_SECRET_KEY)) as { id: string, secretKey: string };
    }

}

