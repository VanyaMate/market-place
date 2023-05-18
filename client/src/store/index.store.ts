import {configureStore} from "@reduxjs/toolkit";
import {productsApi} from "./products/products.api";

export const store = configureStore({
    reducer: {
        'products/api': productsApi.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat([
        productsApi.middleware,
    ])
})

export type StoreType = ReturnType<typeof store.getState>;