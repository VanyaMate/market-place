import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {API_PRODUCTS} from "../../cfg/links.config";
import {IProduct} from "./products.types";
import {IMultiResponse} from "../response.interfaces";

export const productsApi = createApi({
    reducerPath: 'products/api',
    baseQuery: fetchBaseQuery({
        baseUrl: API_PRODUCTS
    }),
    endpoints: (build) => ({
        getProducts: build.query<IMultiResponse<IProduct>, any>({
            query: () => ({
                url: '/all',
                method: 'get',
            })
        }),
        getProductsBy: build.query<IMultiResponse<IProduct>, any>({
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