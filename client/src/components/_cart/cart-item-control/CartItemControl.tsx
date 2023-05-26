import React from 'react';
import RoundedButton from "../../_buttons/rounded-button/RoundedButton";
import {useActions} from "../../../hooks/_redux/useActions.hook";
import {useLazyChangeCartQuery} from "../../../store/cart/cart.api";
import {ICartItem} from "../../../store/auth/auth.types";
import {useCart} from "../../../hooks/useCart";

const CartItemControl: React.FC<ICartItem> = (props) => {
    const {addToCart, fetching, removeFromCart} = useCart();

    const _addToCart = () => {
        addToCart({ product: props.product, amount: 1});
    }

    const _removeFromCart = () => {
        removeFromCart({ product: props.product, amount: 1 });
    }

    return (
        <div style={{display: 'flex'}}>
            <RoundedButton icon={'/icons/delete.png'} onClick={_removeFromCart} active={!fetching}/>
            <RoundedButton icon={'/icons/editing.png'} onClick={_addToCart} active={!fetching}/>
        </div>
    );
};

export default CartItemControl;