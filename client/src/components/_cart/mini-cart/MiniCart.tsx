import React, {useMemo} from 'react';
import {useMySelector} from "../../../hooks/_redux/useMySelector.hook";
import MiniCartProductItem from "./mini-cart-product-item/MiniCartProductItem";
import css from './MiniCart.module.scss';
import Vertical from "../../_ui/_containers/vertical/Vertical";

const MiniCart = () => {
    const cart = useMySelector((state) => state.cart);

    return (
        <Vertical offset={10} className={css.container}>
            {
                cart.cart.map((item) => {
                    return <MiniCartProductItem key={item.product._id} {...item}/>
                })
            }
        </Vertical>
    );
};

export default MiniCart;