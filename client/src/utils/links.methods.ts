import {BACKEND_HOST} from "../cfg/links.config";

export enum ImageLinkSize {
    SMALL,
    MEDIUM,
    BIG,
    ORIGINAL
}

export const getProductImageLink = function (path: string, type: ImageLinkSize): string {
    const commonPath = BACKEND_HOST + '/image/product/' + path;
    switch (type) {
        case ImageLinkSize.BIG:
            return commonPath + '-800x800.jpeg';
        case ImageLinkSize.MEDIUM:
            return commonPath + '-400x400.jpeg';
        case ImageLinkSize.SMALL:
            return commonPath + '-200x200.jpeg';
        case ImageLinkSize.ORIGINAL:
            return commonPath + '.jpeg';
    }
}