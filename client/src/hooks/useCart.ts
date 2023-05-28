import {useActions} from "./_redux/useActions.hook";
import {useLazyAddToCartQuery, useLazyChangeCartQuery, useLazyResetCartQuery} from "../store/cart/cart.api";
import {useCallback, useMemo} from "react";
import {ICartItem} from "../store/auth/auth.types";
import {useMySelector} from "./_redux/useMySelector.hook";
import {IPrice, IUsePrice, usePriceCallback} from "./usePrice";

export const useCart = function () {
    const [dispatchChangeCart, changeCartStatus] = useLazyChangeCartQuery();
    const [dispatchAddToCart, addToCartStatus] = useLazyAddToCartQuery();
    const [dispatchResetCart, resetCartStatus] = useLazyResetCartQuery();
    const {addToCart, removeFromCart, updateItemCart, resetCart, updateCart} = useActions();
    const cart = useMySelector((state) => state.cart);
    const dispatchPriceEstimation = usePriceCallback();
    const fetchingStatus = useMemo(() => {
        return changeCartStatus.isFetching || addToCartStatus.isFetching || resetCartStatus.isFetching;
    }, [changeCartStatus.isFetching, addToCartStatus.isFetching, resetCartStatus.isFetching])

    const summaryPrice: IPrice = useMemo(() => {
        const summary: IPrice = {
            original: 0,
            discount: 0,
            estimation: 0,
        };

        for (let i = 0; i < cart.cart.length; i++) {
            const item = cart.cart[i];
            const price: IPrice = dispatchPriceEstimation(item.product as IUsePrice);

            summary.original += price.original * item.amount;
            summary.discount += price.discount * item.amount;
            summary.estimation += price.estimation * item.amount;
        }

        return summary;
    }, [cart.cart]);

    const addToCartMethod = useCallback((props: ICartItem) => {
        addToCart(props);
        dispatchAddToCart({ productId: props.product._id, amount: props.amount })
            .then((response) => {
                if (!response.data) {
                    removeFromCart(props);
                } else {
                    updateCart(response.data);
                }
            })
    }, [cart.cart]);

    const removeFromCartMethod = useCallback((props: ICartItem) => {
        const currentAmount = cart.cart.filter((item) => item.product._id === props.product._id)[0]?.amount;
        removeFromCart(props);
        dispatchChangeCart({ productId: props.product._id, amount: currentAmount - props.amount })
            .then((response) => {
                if (!response.data) {
                    addToCart(props);
                } else {
                    updateCart(response.data);
                }
            })
    }, [cart.cart]);

    const changeCartMethod = useCallback((props: ICartItem) => {
        const previousAmount = cart.cart.filter((item) => item.product._id === props.product._id)[0]?.amount;
        if (previousAmount) {
            updateItemCart(props);
            dispatchChangeCart({ productId: props.product._id, amount: props.amount })
                .then((response) => {
                    if (!response.data) {
                        updateItemCart({ product: props.product, amount: previousAmount });
                    } else {
                        updateCart(response.data);
                    }
                })
        }
    }, [cart.cart])

    const resetCartMethod = useCallback(() => {
        const previousCart = [...cart.cart].splice(0, cart.cart.length);
        if (previousCart.length) {
            resetCart();
            dispatchResetCart().then((response) => {
                if (!response.data) {
                    updateCart(previousCart);
                }
            })
        }
    }, [cart.cart])

    const getAmountById = useCallback((id: string) => {
        const product = [...cart.cart].filter((item) => item.product._id === id)[0];
        return product?.amount;
    }, [cart.cart]);

    return {
        addToCart: addToCartMethod,
        removeFromCart: removeFromCartMethod,
        changeCart: changeCartMethod,
        resetCart: resetCartMethod,
        fetching: fetchingStatus,
        summaryPrice: summaryPrice,
        getAmountById: getAmountById,
    };
}