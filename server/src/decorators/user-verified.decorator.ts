import {createParamDecorator, ExecutionContext} from "@nestjs/common";
import {USER_ID} from "../.constants";

export interface IUserVerifiedData {
    id: string,
}

export const UserVerified = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const userVerifiedData: IUserVerifiedData = {
            id: request[USER_ID],
        };

        return userVerifiedData;
    },
);