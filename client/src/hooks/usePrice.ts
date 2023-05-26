import {useMemo} from "react";

export enum DiscountType {
    FIX = "FIX",
    PERCENT = "PERCENT",
}

export interface IUsePrice {
    price: number;
    discount?: number;
    discountType?: DiscountType;
}

export const usePrice = function (props: IUsePrice): number {
    return useMemo(() => {
        if (!props.discount) {
            return props.price;
        }
        return Number(
            props.discountType === DiscountType.FIX ?
                props.price - props.discount! :
                (props.price - props.price / 100 * props.discount!).toFixed(0)
        );
    }, [])
}