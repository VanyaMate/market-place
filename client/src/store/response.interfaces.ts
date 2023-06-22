export interface ISearchOptions {
    limit?: number;
    offset?: number;
    sort?: string[];
}

export interface IMultiResponse<T> {
    list: T[],
    count: number;
    options: ISearchOptions,
}