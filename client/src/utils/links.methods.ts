import {BACKEND_HOST} from "../cfg/links.config";

export enum ImageLinkSize {
    TINY,
    SMALL,
    MEDIUM,
    BIG,
    ORIGINAL
}

export const getProductImageLink = function (path: string, type: ImageLinkSize): string {
    const commonPath = BACKEND_HOST + '/' + path;
    switch (type) {
        case ImageLinkSize.BIG:
            return commonPath + '-800x800.jpeg';
        case ImageLinkSize.MEDIUM:
            return commonPath + '-400x400.jpeg';
        case ImageLinkSize.SMALL:
            return commonPath + '-200x200.jpeg';
        case ImageLinkSize.TINY:
            return commonPath + '-100x100.jpeg';
        case ImageLinkSize.ORIGINAL:
            return commonPath + '.jpeg';
    }
}

export const getBrandImageLink = function (path: string, type: ImageLinkSize): string {
    const commonPath = BACKEND_HOST + '/' + path;
    switch (type) {
        case ImageLinkSize.BIG:
            return commonPath + '-400x400.jpeg';
        case ImageLinkSize.MEDIUM:
            return commonPath + '-200x200.jpeg';
        case ImageLinkSize.SMALL:
            return commonPath + '-100x100.jpeg';
        case ImageLinkSize.TINY:
            return commonPath + '-50x50.jpeg';
        case ImageLinkSize.ORIGINAL:
            return commonPath + '.jpeg';
    }
}