import {  ICattleECommerce, ICattleECommerceResponse } from "@/interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const ECommerceApi = createApi({

    reducerPath:"ECommerce",
    tagTypes:["ECommerce"],
    baseQuery:fetchBaseQuery({
        baseUrl:'https://farmxpertapi.runasp.net/api/v2'
    }),
    endpoints:(build)=>({
        getCattleECommerce : build.query<ICattleECommerceResponse,void>({
            query:()=>({
                url:"/Products/AllCattle"
            }),
            providesTags:["ECommerce"],
        }),
        getCattleECommerceByID : build.query<ICattleECommerce,{id:number}>({
            query:({id})=>({
                url:`/Products/Cattle/${id}`
            }),
            providesTags:["ECommerce"],
        })
    })



})

export default ECommerceApi.reducer
export const {useGetCattleECommerceQuery,useGetCattleECommerceByIDQuery} = ECommerceApi;