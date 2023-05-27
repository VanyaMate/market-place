import {useCallback, useMemo} from "react";

export enum DiscountType {
    FIX = "FIX",
    PERCENT = "PERCENT",
}

export interface IUsePrice {
    price: number;
    discount?: number;
    discountType?: DiscountType;
}

export interface IPrice {
    original: number;
    discount: number;
    estimation: number;
}

export const usePrice = function (props: IUsePrice): IPrice {
    return useMemo(() => {
        return priceEstimation(props);
    }, [props])
}

export const usePriceCallback = function () {
    return useCallback((props: IUsePrice) => {
        return priceEstimation(props);
    }, []);
}

const priceEstimation = function (props: IUsePrice): IPrice {
    if (!props.discount) {
        return { original: props.price, discount: 0, estimation: props.price };
    }

    let discount = 0;
    let original = 0;
    let estimation = 0;

    if (props.discountType === DiscountType.FIX) {
        original = props.price;
        discount = props.discount;
        estimation = props.price - props.discount;
    } else {
        const _discount: number = +(props.price / 100 * props.discount).toFixed(0);
        discount = _discount;
        original = props.price;
        estimation = props.price - _discount;
    }

    return { discount, original, estimation };
}