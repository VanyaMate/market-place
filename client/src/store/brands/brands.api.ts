import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const brandsApi = createApi({
    reducerPath: 'brands/api',
    baseQuery: fetchBaseQuery({
        baseUrl: '',
    }),
    endpoints: (build) => ({

    })
})