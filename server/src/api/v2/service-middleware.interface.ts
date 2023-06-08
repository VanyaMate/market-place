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

export enum SortType {
    ACS = 'acs',
    DESC = 'desc',
}

export type ISortOption<T> = { [key in keyof T]: SortType };

export interface ISearchOptions<T> {
    limit?: number;
    offset?: number;
    sort?: ISortOption<T>;
}

export interface IServiceMiddleware<T,C> {
    create: (data: C) => Promise<T>;
    delete: (filter: Partial<T>) => Promise<IDeletedItem>;
    findById: (id: string) => Promise<T>;
    findMany: (filter: Partial<T>) => Promise<IMultiResponse<T>>;
    update: (params: Partial<C>) => Promise<T>;
}

export abstract class Service<T, C> {
    protected constructor(protected middleware: IServiceMiddleware<T, C>) {}
}