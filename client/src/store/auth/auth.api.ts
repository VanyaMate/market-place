import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {AUTH_API} from "../../cfg/links.config";

export const authApi = createApi({
    reducerPath: 'auth/api',
    baseQuery: fetchBaseQuery({
        baseUrl: AUTH_API
    }),
    endpoints: (build) => ({
        registration: build.query<any, { login: string, password: string }>({
            query: (props) => ({
                url: '/registration',
                body: props,
                method: 'post',
            })
        }),
        login: build.query<any, { login: string, password: string }>({
            query: (props) => ({
                url: '/login',
                body: props,
                method: 'post',
            })
        }),
        logout: build.query<any, any>({
            query: (props) => ({
                url: '/logout',
                method: 'post',
            })
        }),
    })
})

export const {useLazyLogoutQuery} = authApi;