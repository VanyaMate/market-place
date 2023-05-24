import {IProduct} from "../products/products.types";

export interface IUser {
    email: string;
    orders: string[];
    avatar?: string;
    cart?: ICartItem[];
}

export interface ICartItem {
    product: IProduct
    amount: number
}