import {DiscountType} from "../../hooks/usePrice.hook";

export interface IProducts {
    products?: (IProduct)[] | null;
    options: IResponseOptions;
    count: number;
}
export interface IImage {
    _id?: string;
    title?: string;
    path: string;
    type: string;
}

export interface IProduct {
    _id: string;
    article: string;
    title: string;
    description: string;
    generalImage: IImage;
    images?: IImage[];
    price: number;
    priceCurrency?: string;
    discount?: number;
    discountType?: DiscountType;
    brand: IBrand;
}
export interface IBrand {
    _id: string;
    title: string;
    description: string;
    image: IImage;
}
export interface IResponseOptions {
    limit: number;
    offset: number;
}
