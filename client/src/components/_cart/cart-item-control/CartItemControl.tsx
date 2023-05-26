import React from 'react';
import RoundedButton from "../../_buttons/rounded-button/RoundedButton";
import {ICartItem} from "../../../store/auth/auth.types";
import {useCart} from "../../../hooks/useCart";
import Input from "../../_ui/_inputs/input/Input";
import {useInput} from "../../../hooks/useInput.hook";
import css from './CartItemControl.module.scss';
import Row from "../../_ui/_containers/row/Row";

const CartItemControl: React.FC<ICartItem> = (props) => {
    const {addToCart, fetching, removeFromCart, changeCart} = useCart();
    const amountHook = useInput(props.amount.toString());

    const _addToCart = () => {
        addToCart({ product: props.product, amount: 1});
    }

    const _removeFromCart = () => {
        removeFromCart({ product: props.product, amount: 1 });
    }

    const _changeAmountCart = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            console.log('enter');
            const amount = (e.target as HTMLInputElement).value;
            amountHook.setValue(amount);
            changeCart({ product: props.product, amount: +amount })
        }
    }

    return (
        <Row offset={5} className={css.container}>
            <RoundedButton icon={'/icons/delete.png'} onClick={_removeFromCart} active={!fetching}/>
            <Input inputHook={amountHook} className={css.amount} onKeyDown={_changeAmountCart}/>
            <RoundedButton icon={'/icons/editing.png'} onClick={_addToCart} active={!fetching}/>
        </Row>
    );
};

export default React.memo(CartItemControl);