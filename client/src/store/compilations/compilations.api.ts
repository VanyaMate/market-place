import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {COMPILATIONS_API} from "../../cfg/links.config";
import {ProductsEntity} from "../products/products.types";

export const compilationsApi = createApi({
    reducerPath: 'compilations/api',
    baseQuery: fetchBaseQuery({
        baseUrl: COMPILATIONS_API,
    }),
    endpoints: (build) => ({
        getNew: build.query<ProductsEntity[], any>({
            query: () => ({
                url: '/new',
                method: 'GET'
            })
        })
    })
})

export const {useLazyGetNewQuery, useGetNewQuery} = compilationsApi;