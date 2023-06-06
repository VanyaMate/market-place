import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {API_COMPANIES} from "../../cfg/links.config";

export const companiesApi = createApi({
    reducerPath: 'companies/api',
    baseQuery: fetchBaseQuery({
        baseUrl: API_COMPANIES,
        credentials: 'include',
    }),
    endpoints: (build) => ({
        createCompany: build.query<{ formData: FormData }, any>({
            query: (props) => {
                console.log(props);
                return {
                    url: 'create',
                    body: props.formData,
                    method: "POST",
                }
            }
        })
    })
})

export const {useLazyCreateCompanyQuery} = companiesApi;