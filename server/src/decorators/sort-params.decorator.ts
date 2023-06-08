import {createParamDecorator, ExecutionContext} from "@nestjs/common";
import { Request } from 'express';
import {getSortParams} from "../helpers/utils";
import {ISearchOptions} from "../api/v2/service-middleware.interface";

export const SortParams = createParamDecorator(
    <T>(data: string, ctx: ExecutionContext) => {
        const request: Request = ctx.switchToHttp().getRequest();
        const query = request.query;

        return {
            sort: getSortParams((query['sort'] as string ?? '').split(',')),
            limit: Number(query['limit'] as string ?? 10),
            offset: Number(query['offset'] as string ?? 0),
        } as ISearchOptions<T>;
    },
);