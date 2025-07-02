import { IManager } from "@/interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const ManagerApiSlice =createApi({
   reducerPath:'manager',
   tagTypes:['Manager'],
    baseQuery:fetchBaseQuery({
        baseUrl:'http://farmxpertapi.runasp.net/api'
    }),
    endpoints:(build)=>({
        getManagers:build.query<IManager[],void>({
            query:()=>({
                url:'/Managers/All'
            }),
            providesTags: ["Manager"],
        })
    })
})

export default ManagerApiSlice.reducer;
export const {useGetManagersQuery}=ManagerApiSlice