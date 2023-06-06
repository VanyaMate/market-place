import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {API_BRANDS} from "../../cfg/links.config";
import {IBrand} from "./brands.interfaces";

export const brandsApi = createApi({
    reducerPath: 'brands/api',
    baseQuery: fetchBaseQuery({
        baseUrl: API_BRANDS,
        credentials: 'include',
    }),
    endpoints: (build) => ({
        createBrand: build.query<IBrand, { formData: FormData }>({
            query: (props) => ({
                url: 'create',
                method: 'post',
                body: props.formData
            })
        })
    })
})

export const {useLazyCreateBrandQuery} = brandsApi;