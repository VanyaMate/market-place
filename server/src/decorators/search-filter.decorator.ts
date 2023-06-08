import {createParamDecorator, ExecutionContext} from "@nestjs/common";
import { Request } from 'express';

export const SearchFilter = createParamDecorator(
    <T>(data: string, ctx: ExecutionContext) => {
        const request: Request = ctx.switchToHttp().getRequest();
        const query = request.query;
        const filterQuery = (query['filter'] as string) ?? '';
        const filtersList = filterQuery.split(',');
        const filters: Partial<T> = {}
        for (let i = 0; i < filtersList.length; i++) {
            const filter = filtersList[i];
            const [ key, value ] = filter.split(':');
            filters[key] = value;
        }
        return filters;
    },
);