import React, {useMemo} from 'react';
import css from './CartSummary.module.scss';
import {useMySelector} from "../../../../hooks/_redux/useMySelector.hook";
import {useCart} from "../../../../hooks/useCart";

const CartSummary = () => {
    const cart = useMySelector(state => state.cart);
    const { summaryPrice } = useCart();

    return (
        <div className={css.container}>
            Итог: { summaryPrice.estimation } ( - { summaryPrice.discount } )
        </div>
    );
};

export default CartSummary;