import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {AUTH_API} from "../../cfg/links.config";
import {IUser} from "./auth.types";

export const authApi = createApi({
    reducerPath: 'auth/api',
    baseQuery: fetchBaseQuery({
        baseUrl: AUTH_API,
        credentials: 'include'
    }),
    endpoints: (build) => ({
        registration: build.query<IUser, { email: string, password: string }>({
            query: (props) => ({
                url: '/registration',
                body: props,
                method: 'post',
            })
        }),
        login: build.query<IUser, { email: string, password: string }>({
            query: (props) => ({
                url: '/login',
                body: props,
                method: 'post',
            })
        }),
        logout: build.query<void, void>({
            query: () => ({
                url: '/logout',
                method: 'post',
            })
        }),
        token: build.query<IUser, void>({
            query: () => ({
                url: '/token',
                method: 'post',
            })
        }),
    })
})

export const {useLazyLogoutQuery, useLazyLoginQuery, useLazyRegistrationQuery, useTokenQuery} = authApi;