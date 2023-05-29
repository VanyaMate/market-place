import React from 'react';
import css from './CartSummary.module.scss';
import {useMySelector} from "../../../../hooks/_redux/useMySelector.hook";
import {useCart} from "../../../../hooks/useCart.hook";
import ProductPrice from "../../../_product/product-price/ProductPrice";
import {DiscountType} from "../../../../hooks/usePrice.hook";
import TitledBlock from "../../../titled-block/TitledBlock";


const CartSummary: React.FC<{ currency: string }> = (props) => {
    const cart = useMySelector(state => state.cart);
    const { summaryPrice } = useCart();

    /**
     * TODO: Изменить priceCurrency
     */
    return (
        <div className={css.container}>
            <TitledBlock title={'Итоговая сумма'}>
                <ProductPrice
                    price={summaryPrice.original}
                    priceCurrency={props.currency}
                    discount={summaryPrice.discount}
                    discountType={DiscountType.FIX}
                />
            </TitledBlock>
        </div>
    );
};

export default CartSummary;