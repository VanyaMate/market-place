import {configureStore} from "@reduxjs/toolkit";
import {productsApi} from "./products/products.api";
import {compilationsApi} from "./compilations/compilations.api";
import {authApi} from "./auth/auth.api";
import {authReducer} from "./auth/auth.slice";
import {globalReducer} from "./global/global.slice";
import {cartApi} from "./cart/cart.api";
import {cartReducer} from "./cart/cart.slice";

export const store = configureStore({
    reducer: {
        'products/api': productsApi.reducer,
        'compilations/api': compilationsApi.reducer,
        'auth/api': authApi.reducer,
        'cart/api': cartApi.reducer,
        auth: authReducer,
        global: globalReducer,
        cart: cartReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat([
        productsApi.middleware,
        compilationsApi.middleware,
        authApi.middleware,
        cartApi.middleware,
    ])
})

export type StoreType = ReturnType<typeof store.getState>;