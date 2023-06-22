import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {API_COMPANIES} from "../../cfg/links.config";
import {ICompany} from "./companies.interfaces";
import {IMultiResponse} from "../response.interfaces";
import {IBrand} from "../brands/brands.interfaces";

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
        getMyCompanies: build.query<IMultiResponse<ICompany>, void>({
            query: () => ({
                url: 'my',
                method: "GET",
            })
        }),
        getFullDataCompany: build.query<{company: ICompany, brands: IMultiResponse<IBrand>}, { title: string }>({
            query: (props) => ({
                url: 'getFullByTitle',
                params: props,
                method: 'GET',
            })
        })
    })
})

export const {useLazyCreateCompanyQuery, useLazyGetMyCompaniesQuery, useGetMyCompaniesQuery, useGetFullDataCompanyQuery} = companiesApi;