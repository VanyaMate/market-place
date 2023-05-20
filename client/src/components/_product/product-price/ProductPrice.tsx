import React from 'react';
import {IDefaultComponent} from "../../../interfaces/default-component.interface";
import css from './ProductPrice.module.scss';

export interface IProductPrice extends IDefaultComponent {
    price: number;
    priceCurrency?: string;
    discount?: number;
    discountType?: string;
}

const ProductPrice: React.FC<IProductPrice> = (props) => {
    const discountValue = props.discountType === 'FIX' ? (props.priceCurrency ?? 'руб.') : '%';
    const priceWithDiscount = props.discountType === 'FIX' ? props.price - props.discount! : (props.price - props.price / 100 * props.discount!).toFixed(0);

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
                        <div className={css.price}>
                            {priceWithDiscount}
                            <span>{props.priceCurrency ?? 'руб.'}</span>
                        </div>
                    </div>
                    :
                    <div className={css.price}>
                        {props.price}
                        <span>{props.priceCurrency ?? 'руб.'}</span>
                    </div>
            }
        </div>
    );
};

export default React.memo(ProductPrice);