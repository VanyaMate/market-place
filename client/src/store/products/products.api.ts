import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {PRODUCTS_API} from "../../cfg/links.config";
import {Products} from "./products.types";

export const productsApi = createApi({
    reducerPath: 'products/api',
    baseQuery: fetchBaseQuery({
        baseUrl: PRODUCTS_API,
    }),
    endpoints: (build) => ({
        getProducts: build.query<Products, any>({
            query: () => ({
                url: '/all',
                method: 'get',
            })
        })
    })
})

export const {useLazyGetProductsQuery, useGetProductsQuery} = productsApi;