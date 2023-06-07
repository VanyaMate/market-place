import {ISearchOptions} from "./search.interfaces";

export interface IMultiResponse<T> {
    list: T[],
    count: number;
    options: ISearchOptions,
}