import {ISearchFilter} from "../api/v2/service-middleware.interface";

export const getRandomInt = function (min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
}

export const getSortParams = function (sort: string[]) {
    const sortParams = {};
    if (!sort) return sortParams;

    for (let i = 0; i < sort.length; i++) {
        const [key, sortType] = sort[i].split(':');
        if (!key) continue;
        sortParams[key] = sortType ?? 'asc';
    }

    return sortParams;
}

const getFilterQueryObjectItem = function (prefix, object, concat) {
    Object.keys(object).forEach((key) => {
        if (typeof object[key] === 'object') {
            getFilterQueryObjectItem(prefix + '.' + key, object[key], concat)
        } else {
            concat[`${ prefix }.${ key }`] = object[key];
        }
    })
}

export const getFilterQuery = function (filter: ISearchFilter<any>) {
    const filterQuery = {};

    for (let key in filter) {
        if (typeof filter[key] === 'object') {
            getFilterQueryObjectItem(key, filter[key], filterQuery)
        } else {
            filterQuery[key] = filter[key];
        }
    }

    return filterQuery;
}