import React, {useMemo} from 'react';
import {useMySelector} from "../../../hooks/_redux/useMySelector.hook";
import MiniCartProductItem from "./mini-cart-product-item/MiniCartProductItem";
import css from './MiniCart.module.scss';
import Vertical from "../../_ui/_containers/vertical/Vertical";
import CartSummary from "./cart-summary/CartSummary";
import MakeOrderButton from "../../_buttons/make-order-button/MakeOrderButton";

const MiniCart = () => {
    const cart = useMySelector((state) => state.cart);

    return (
        <Vertical offset={10} className={css.container}>
            {
                cart.cart.map((item) => {
                    return <MiniCartProductItem key={item.product._id} {...item}/>
                })
            }
            <CartSummary currency={'руб.'}/>
            <MakeOrderButton/>
        </Vertical>
    );
};

export default React.memo(MiniCart);