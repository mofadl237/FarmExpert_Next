import { IManager, IManagerAdd } from "@/interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const ManagerApiSlice =createApi({
   reducerPath:'manager',
   tagTypes:['Manager'],
    baseQuery:fetchBaseQuery({
        baseUrl:'https://farmxpertapi.runasp.net/api'
    }),
    endpoints:(build)=>({
        getManagers:build.query<IManager[],void>({
            query:()=>({
                url:'/Managers/All'
            }),
            providesTags: ["Manager"],
        }),
        addManager:build.mutation<void, IManagerAdd>({
            query:(body:IManagerAdd)=>({
                url:`/Managers/Add Manager`,
                method:'POST',
                body,
            }),
            invalidatesTags:['Manager']
        }),
        updateManager:build.mutation<void,{ id: number; body: IManagerAdd }>({
            query:({id , body})=>({
                url:`Managers/${id}`,
                method:'PUT',
                body,
            }),
            invalidatesTags:['Manager']
        }),
        deleteManager:build.mutation<void, number>({
            query:(id)=>({
                url:`Managers/${id}`,
                method:'DELETE'
            }),
            invalidatesTags:['Manager']
        }),
    })
})

export default ManagerApiSlice.reducer;
export const {useGetManagersQuery,useAddManagerMutation,useDeleteManagerMutation,useUpdateManagerMutation}=ManagerApiSlice