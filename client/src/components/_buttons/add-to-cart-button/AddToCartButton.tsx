import React, {useCallback, useMemo} from 'react';
import {IDefaultComponent} from "../../../interfaces/default-component.interface";
import Button from "../../_ui/_buttons/button/Button";
import {useLazyAddToCartQuery} from "../../../store/cart/cart.api";
import css from './AddToCartButton.module.scss';
import {useActions} from "../../../hooks/_redux/useActions.hook";
import {IProduct} from "../../../store/products/products.types";
import {useNotifications} from "../../../hooks/useNotifications.hook";
import {NotificationType} from "../../../store/notifications/notifications.slice";
import {useCart} from "../../../hooks/useCart";
import Row from "../../_ui/_containers/row/Row";

export interface IAddToCartButton extends IDefaultComponent {
    product: IProduct;
}

const AddToCartButton: React.FC<IAddToCartButton> = (props) => {
    const [dispatchAddToCart, {isFetching, isError, data}] = useLazyAddToCartQuery();
    const {addToCart: addToLocalCart, removeFromCart} = useActions();
    const addNotification = useNotifications();
    const cart = useCart();
    const cartAmount = useMemo(() => cart.getAmountById(props.product._id), [cart]);
    const addToCart = useCallback(() => {
        addToLocalCart({ product: props.product, amount: 1 })
        dispatchAddToCart({ productId: props.product._id }).then((response) => {
            if (!response.data) {
                removeFromCart({ product: props.product, amount: 1 });
                addNotification({
                    data: props.product,
                    type: NotificationType.ADD_TO_CART_ERROR
                }, 30000);
            }
        });
    }, [props.product]);

    return (
        <Row offset={5} className={[css.container].join(' ')}>
            <Button
                onClick={addToCart}
                active={!isFetching}
                className={[props.className, css.button].join(' ')}
            >{props.children}</Button>
            { cartAmount ? <div className={css.amount}>{cartAmount}</div> : '' }
        </Row>
    );
};

export default AddToCartButton;