import React, {useCallback} from 'react';
import {IDefaultComponent} from "../../../interfaces/default-component.interface";
import Button from "../../_ui/_buttons/button/Button";
import {useLazyAddToCartQuery} from "../../../store/cart/cart.api";
import css from './AddToCartButton.module.scss';
import {useActions} from "../../../hooks/_redux/useActions.hook";
import {IProduct} from "../../../store/products/products.types";

export interface IAddToCartButton extends IDefaultComponent {
    product: IProduct;
}

const AddToCartButton: React.FC<IAddToCartButton> = (props) => {
    const [dispatchAddToCart, {isFetching, isError, data}] = useLazyAddToCartQuery();
    const {addToCart: addToLocalCart, removeFromCart} = useActions();
    const addToCart = useCallback(() => {
        addToLocalCart({ product: props.product, amount: 1 })
        dispatchAddToCart({ productId: props.product._id }).then((response) => {
            if (!response.data) {
                removeFromCart({ product: props.product, amount: 1 });
            }
        });
    }, [props.product]);

    return (
        <div className={[css.container].join(' ')}>
            <Button
                onClick={addToCart}
                active={!isFetching}
                className={[props.className, css.button].join(' ')}
            >{ props.children }</Button>
        </div>
    );
};

export default AddToCartButton;