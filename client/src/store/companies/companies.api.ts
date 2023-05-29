import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {API_COMPANIES} from "../../cfg/links.config";

export const companiesApi = createApi({
    reducerPath: 'companies/api',
    baseQuery: fetchBaseQuery({
        baseUrl: API_COMPANIES,
        credentials: 'include',
    }),
    endpoints: (build) => ({
        createCompany: build.query<any, any>({
            query: (props) => ({
                url: 'create',
                body: props
            })
        })
    })
})

export const {useLazyCreateCompanyQuery} = companiesApi;