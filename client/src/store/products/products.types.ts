import {DiscountType} from "../../hooks/usePrice.hook";
import {IBrand} from "../brands/brands.interfaces";

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

export interface IResponseOptions {
    limit: number;
    offset: number;
}
