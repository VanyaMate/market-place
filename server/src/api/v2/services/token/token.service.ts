import {Injectable} from "@nestjs/common";
import {TokenMongooseService} from "../../service-middlewares/mongoose/token/token-mongoose.service";
import {TokenDto} from "./dto/token.dto";
import {IToken} from "./token.interface";
import {randomUUID} from "crypto";

@Injectable()
export class TokenService {

    constructor(private tokenMongooseService: TokenMongooseService) {}

    async create (userId: string): Promise<IToken> {
        const token = randomUUID();
        const tokenDto: TokenDto = new TokenDto(token, userId);

        return this.tokenMongooseService.create(tokenDto);
    }

    async getByUserId (userId: string): Promise<IToken> {
        return this.tokenMongooseService.findById(userId);
    }

    async delete (userId: string): Promise<boolean> {
        return this.tokenMongooseService.delete({ user: { id: userId } });
    }

    async reset (userId: string): Promise<string> {
        const token = randomUUID();
        const tokenDocument = await this.tokenMongooseService.update({ user: { id: userId } }, { token });
        return token;
    }

}