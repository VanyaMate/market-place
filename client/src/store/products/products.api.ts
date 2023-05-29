import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {API_PRODUCTS} from "../../cfg/links.config";
import {IProducts, IProduct} from "./products.types";

export const productsApi = createApi({
    reducerPath: 'products/api',
    baseQuery: fetchBaseQuery({
        baseUrl: API_PRODUCTS
    }),
    endpoints: (build) => ({
        getProducts: build.query<IProducts, any>({
            query: () => ({
                url: '/all',
                method: 'get',
            })
        }),
        getProductsBy: build.query<IProducts, any>({
            query: (params) => ({
                url: '/findBy',
                method: 'get',
                params: params
            })
        }),
        getProductById: build.query<IProduct, { id: string }>({
            query: ({ id }) => ({
                url: `/id/${id}`,
                method: 'get',
            })
        })
    })
})

export const {useLazyGetProductsQuery, useGetProductsQuery, useLazyGetProductsByQuery, useGetProductByIdQuery} = productsApi;