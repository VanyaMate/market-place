export const getRandomInt = function (min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
}

export const getSortParams = function (sort: string[]) {
    const sortParams = {};

    for (let i = 0; i < sort.length; i++) {
        const [key, sortType] = sort[i].split(':');
        if (!key) continue;
        sortParams[key] = sortType ?? 'asc';
    }

    return sortParams;
}