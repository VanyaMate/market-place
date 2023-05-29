import React from 'react';
import {IDefaultComponent} from "../../../interfaces/default-component.interface";
import css from './ProductPrice.module.scss';
import {DiscountType, IUsePrice, usePrice} from "../../../hooks/usePrice.hook";
import PriceCurrency from "./price-currency/PriceCurrency";

export interface IProductPrice extends IDefaultComponent {
    price: number;
    priceCurrency?: string;
    discount?: number;
    discountType?: DiscountType;
}

const ProductPrice: React.FC<IProductPrice> = (props) => {
    const discountValue = props.discountType === DiscountType.FIX ? (props.priceCurrency ?? 'руб.') : '%';
    const price = usePrice(props as IUsePrice);

    return (
        <div className={[css.container, props.className].join(' ')}>
            {
                !!props.discount ?
                    <div className={css.discount}>
                        <div className={css.original}>
                            {props.price}
                            <span>{props.priceCurrency ?? 'руб.'}</span>
                            <div className={css.amount}>
                                - {props.discount}
                                <span>{discountValue}</span>
                            </div>
                        </div>

                        <PriceCurrency price={price.estimation} currency={props.priceCurrency}/>
                    </div>
                    :
                    <PriceCurrency price={price.estimation} currency={props.priceCurrency}/>
            }
        </div>
    );
};

export default React.memo(ProductPrice);