import React, {useCallback, useMemo} from 'react';
import {IDefaultComponent} from "../../../interfaces/default-component.interface";
import Button from "../../_ui/_buttons/button/Button";
import css from './AddToCartButton.module.scss';
import {IProduct} from "../../../store/products/products.types";
import {useCart} from "../../../hooks/useCart";
import Row from "../../_ui/_containers/row/Row";

export interface IAddToCartButton extends IDefaultComponent {
    product: IProduct;
}

const AddToCartButton: React.FC<IAddToCartButton> = (props) => {
    const cart = useCart();
    const cartAmount = useMemo(() => cart.getAmountById(props.product._id), [cart]);
    const addToCart = useCallback(() => {
        cart.addToCart({ product: props.product, amount: 1 })
    }, [props.product]);

    return (
        <Row offset={5} className={[css.container].join(' ')}>
            <Button
                onClick={addToCart}
                active={!cart.fetching}
                className={[props.className, css.button].join(' ')}
            >
                {props.children}
            </Button>
            { cartAmount ? <div className={css.amount}>{cartAmount}</div> : '' }
        </Row>
    );
};

export default AddToCartButton;