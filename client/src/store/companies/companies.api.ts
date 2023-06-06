import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {API_COMPANIES} from "../../cfg/links.config";
import {ICompany} from "./companies.interfaces";

export const companiesApi = createApi({
    reducerPath: 'companies/api',
    baseQuery: fetchBaseQuery({
        baseUrl: API_COMPANIES,
        credentials: 'include',
    }),
    endpoints: (build) => ({
        createCompany: build.query<ICompany, { formData: FormData }>({
            query: (props) => ({
                url: 'create',
                body: props.formData,
                method: "POST",
            })
        }),
        getMyCompanies: build.query<ICompany[], void>({
            query: () => ({
                url: 'my',
                method: "GET",
            })
        })
    })
})

export const {useLazyCreateCompanyQuery, useLazyGetMyCompaniesQuery, useGetMyCompaniesQuery} = companiesApi;