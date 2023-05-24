import React, {useMemo} from 'react';
import {useMySelector} from "../../hooks/_redux/useMySelector.hook";
import MiniCartProductItem from "./mini-cart-product-item/MiniCartProductItem";
import css from './MiniCart.module.scss';

const MiniCart = () => {
    const auth = useMySelector((state) => state.auth);
    const cart = useMemo(() => {
        return auth?.user?.cart ?? [];
    }, [auth.user]);

    return (
        <div className={css.container}>
            {
                cart.map((item) => {
                    return <MiniCartProductItem key={item.product._id} {...item}/>
                })
            }
        </div>
    );
};

export default MiniCart;