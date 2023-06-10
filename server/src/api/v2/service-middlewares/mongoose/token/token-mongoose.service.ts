import {
    IMultiResponse,
    ISearchFilter,
    ISearchOptions,
    IServiceMiddleware,
    Projections
} from "../../../service-middleware.interface";
import {IToken} from "../../../services/token/token.interface";
import {InjectModel} from "@nestjs/mongoose";
import {Token, TokenDocument} from "./schemas/token-mongoose.schema";
import {FilterQuery, Model} from "mongoose";
import {TokenDto} from "../../../services/token/dto/token.dto";
import * as mongoose from "mongoose";
import {getFilterQuery} from "../../../../../helpers/utils";

export class TokenMongooseService implements IServiceMiddleware<IToken, TokenDto> {
    
    constructor(@InjectModel(Token.name) private tokenModel: Model<Token>) {}

    async create(data: TokenDto): Promise<IToken> {
        return this._configureToOut(await this.tokenModel.create({
            token: data.token,
            user: new mongoose.Types.ObjectId(data.user)
        }));
    }

    async delete(filter: ISearchFilter<IToken>): Promise<boolean> {
        return (await this.tokenModel.deleteOne(filter)).acknowledged;
    }

    async find(filter: ISearchFilter<IToken> | undefined = {}, searchOptions: ISearchOptions<IToken> | undefined = {}, projections: Projections<IToken> | undefined = {}): Promise<IMultiResponse<IToken>> {
        const tokens: TokenDocument[] = await this.tokenModel
            .find(filter, projections)
            .skip(searchOptions.offset)
            .limit(searchOptions.limit)
            .sort(searchOptions.sort);
        const count: number = await this.tokenModel.find(filter).count();
        return {
            list: tokens.map((token) => this._configureToOut(token)),
            count: count,
            options: searchOptions,
        };
    }

    async findById(id: string, projections: Projections<IToken> | undefined = {}): Promise<IToken> {
        return this._configureToOut(await this.tokenModel.findOne({ userId: id }));
    }

    async update(filter: ISearchFilter<IToken>, params: Partial<TokenDto>): Promise<boolean> {
        console.log('token mongoose update method', filter.user.id);
        const token = await this.tokenModel.find({ user: new mongoose.Types.ObjectId(filter.user.id) }).exec();
        console.log(token);
        return (await this.tokenModel.updateOne(filter, params)).acknowledged;
    }

    private _configureToOut (tokenDocument: TokenDocument): IToken {
        const token: TokenDocument = tokenDocument.toObject();
        delete token._id;
        delete token.__v;
        return token as IToken;
    }

    private _configureToFilter (filter: ISearchFilter<IToken>): FilterQuery<Token> {
        const filterQuery: FilterQuery<IToken> = getFilterQuery(filter);
        return filterQuery;
    }

}