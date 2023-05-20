import {configureStore} from "@reduxjs/toolkit";
import {productsApi} from "./products/products.api";
import {compilationsApi} from "./compilations/compilations.api";
import {authApi} from "./auth/auth.api";

export const store = configureStore({
    reducer: {
        'products/api': productsApi.reducer,
        'compilations/api': compilationsApi.reducer,
        'auth/api': authApi.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat([
        productsApi.middleware,
        compilationsApi.middleware,
        authApi.middleware,
    ])
})

export type StoreType = ReturnType<typeof store.getState>;