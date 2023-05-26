import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {CART_API} from "../../cfg/links.config";
import {ICartItem} from "../auth/auth.types";

export const cartApi = createApi({
    reducerPath: 'cart/api',
    baseQuery: fetchBaseQuery({
        baseUrl: CART_API,
        credentials: 'include',
        cache: 'no-cache',
    }),
    endpoints: (build) => ({
        addToCart: build.query<ICartItem[], { productId: string, amount?: number }>({
            query: (props) => ({
                url: '/add',
                method: 'post',
                body: {
                    productId: props.productId,
                    amount: props.amount ?? 1
                }
            })
        }),
        changeCart: build.query<ICartItem[], { productId: string, amount?: number }>({
            query: (props) => ({
                url: '/change',
                method: 'post',
                body: {
                    productId: props.productId,
                    amount: props.amount ?? 0
                }
            })
        }),
        resetCart: build.query<void, void>({
            query: () => ({
                url: '/reset',
                method: 'post'
            })
        })
    })
})

export const {useLazyAddToCartQuery, useLazyChangeCartQuery, useLazyResetCartQuery} = cartApi;