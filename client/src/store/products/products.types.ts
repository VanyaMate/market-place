export interface Products {
    products?: (ProductsEntity)[] | null;
    options: Options;
    count: number;
}
export interface ProductsEntity {
    _id: string;
    title: string;
    description: string;
    generalImage: string;
    images?: string[];
    price: number;
    priceCurrency?: string;
    discount?: number;
    discountType?: string;
    brand: Brand;
}
export interface Brand {
    _id: string;
    title: string;
    description: string;
    image: string;
}
export interface Options {
    limit: number;
    offset: number;
}
