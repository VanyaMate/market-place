import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {COMPILATIONS_API} from "../../cfg/links.config";
import {IProduct} from "../products/products.types";

export const compilationsApi = createApi({
    reducerPath: 'compilations/api',
    baseQuery: fetchBaseQuery({
        baseUrl: COMPILATIONS_API,
    }),
    endpoints: (build) => ({
        getNew: build.query<IProduct[], { uid: string }>({
            query: (props) => ({
                url: `/new?uid=${props.uid}`,
                method: 'GET',
                cache: 'no-cache'
            })
        })
    })
})

export const {useLazyGetNewQuery, useGetNewQuery} = compilationsApi;