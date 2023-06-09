import {SortOrder} from "mongoose";

export interface IMultiResponse<T> {
    list: T[];
    count: number;
    options: ISearchOptions<Partial<T>>;
}

export type Projections<T> = {
    [key in keyof Partial<T>]: boolean;
};

export interface IDeletedItem {
    id: string;
    deleted: boolean;
}

export type ISortOption<T> = { [key in keyof T]: SortOrder };

export interface ISearchOptions<T> {
    limit?: number;
    offset?: number;
    sort?: ISortOption<T>;
}

export type ISearchFilter<T> = Partial<T>;

export interface IServiceMiddleware<T,C> {
    create: (data: C) => Promise<T>;
    delete: (filter: ISearchFilter<T>) => Promise<boolean>;
    findById: (id: string, projections?: Projections<T>) => Promise<T>;
    find: (filter?: ISearchFilter<T>, searchOptions?: ISearchOptions<T>, projections?: Projections<T>) => Promise<IMultiResponse<T>>;
    update: (filter: ISearchFilter<T>, params: Partial<C>) => Promise<boolean>;
}