import {Inject, Injectable} from "@nestjs/common";
import * as jwt from 'jsonwebtoken';
import {ConfigService} from "@nestjs/config";
import {JWT_SECRET_KEY} from "../../env.constants";

@Injectable()
export class TokensService {

    constructor(private config: ConfigService) {}

    generateToken (): string {
        return jwt.sign({}, this.config.get<string>(JWT_SECRET_KEY), { expiresIn: '7d' });
    }

    verifyToken (token: string): boolean {
        return !!jwt.verify(token, this.config.get<string>(JWT_SECRET_KEY))
    }

}

