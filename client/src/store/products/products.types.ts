import {DiscountType} from "../../hooks/usePrice";

export interface IProducts {
    products?: (IProduct)[] | null;
    options: IResponseOptions;
    count: number;
}
export interface IProduct {
    _id: string;
    article: string;
    title: string;
    description: string;
    generalImage: string;
    images?: string[];
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
    image: string;
}
export interface IResponseOptions {
    limit: number;
    offset: number;
}
