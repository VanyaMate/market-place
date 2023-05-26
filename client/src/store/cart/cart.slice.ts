import {createSlice, Draft, PayloadAction} from "@reduxjs/toolkit";
import {ICartItem} from "../auth/auth.types";
import {IProduct} from "../products/products.types";
import {CART_STORAGE_NAME} from "../../cfg/storage.config";

export interface ICartInitialState {
    cart: ICartItem[],
    disableChanges: boolean
}

const initialState: ICartInitialState = {
    cart: JSON.parse(sessionStorage.getItem(CART_STORAGE_NAME) || "[]"),
    disableChanges: false,
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState as ICartInitialState,
    reducers: {
        addToCart: (state: Draft<ICartInitialState>, action: PayloadAction<ICartItem>) => {
            const cartItem = state.cart.filter((item) => item.product._id === action.payload.product._id)[0];
            if (cartItem) {
                cartItem.amount += action.payload.amount ?? 1;
            } else {
                state.cart.push(action.payload);
            }
            sessionStorage.setItem(CART_STORAGE_NAME, JSON.stringify(state.cart));
        },
        updateCart: (state: Draft<ICartInitialState>, action: PayloadAction<ICartItem[]>) => {
            state.cart = action.payload;
            sessionStorage.setItem(CART_STORAGE_NAME, JSON.stringify(state.cart));
        },
        updateItemCart: (state: Draft<ICartInitialState>, action: PayloadAction<ICartItem>) => {
            state.cart.forEach((cartItem, index) => {
                if (cartItem.product._id === action.payload.product._id) {
                    cartItem.amount = action.payload.amount ?? cartItem.amount;
                    if (cartItem.amount <= 0) {
                        state.cart.splice(index, 1);
                    }
                    return;
                }
            })
            sessionStorage.setItem(CART_STORAGE_NAME, JSON.stringify(state.cart));
        },
        removeFromCart: (state: Draft<ICartInitialState>, action: PayloadAction<{ product: IProduct, amount?: number }>) => {
            state.cart.forEach((cartItem, index) => {
                if (cartItem.product._id === action.payload.product._id) {
                    cartItem.amount -= action.payload.amount ?? cartItem.amount;
                    if (cartItem.amount <= 0) {
                        state.cart.splice(index, 1);
                    }
                    return;
                }
            })
            sessionStorage.setItem(CART_STORAGE_NAME, JSON.stringify(state.cart));
        },
        resetCart: (state: Draft<ICartInitialState>) => {
            state.cart = [];
            sessionStorage.removeItem(CART_STORAGE_NAME);
        }
    }
})

export const cartActions = cartSlice.actions;
export const cartReducer = cartSlice.reducer;