import {createParamDecorator, ExecutionContext} from "@nestjs/common";
import {ACCESS_TOKEN_NAME, USER} from "../.constants";
import {UserDocument} from "../api/user/schemas/user.schema";
import {ITokenData} from "../api/tokens/tokens.service";

export interface IUserVerifiedData {
    user: UserDocument,
    tokenData: ITokenData
}

export const UserVerified = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const userVerifiedData = {
            user: request[USER],
            tokenData: request[ACCESS_TOKEN_NAME],
        };

        return userVerifiedData;
    },
);