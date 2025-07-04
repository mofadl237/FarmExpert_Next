import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"


export const LoginApiSlice =createApi({
    reducerPath:'login',
    tagTypes:['Login'],
    baseQuery:fetchBaseQuery({
        baseUrl:"https://farmxpertapi.runasp.net/api",
    }),
    endpoints:(build)=>({
        login:build.mutation<{ token: string },{email:string , password:string}>({
            query:(body)=>({
                url:'/Auth/login',
                method:'POST',
                body:body
            }),
            invalidatesTags:['Login']
        }),
    })
});

export default LoginApiSlice.reducer;
export const {useLoginMutation}=LoginApiSlice;