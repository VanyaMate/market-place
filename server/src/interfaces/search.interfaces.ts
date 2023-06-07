export interface ISearchOptions {
    limit?: number;
    offset?: number;
    sort?: string[];
}

export type Projections<T> = {
    [key in keyof Partial<T>]: boolean;
};