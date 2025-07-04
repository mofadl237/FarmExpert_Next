import { IRequest, IRequestContact } from "@/interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const RequestApiSlice =createApi({
    reducerPath:'request',
    tagTypes:['Request'],
    baseQuery:fetchBaseQuery({
        baseUrl:'http://farmxpertapi.runasp.net/api'
    }),
    endpoints:(build)=>({
        getRequests:build.query<IRequest[],void>({
            query :()=>({
                url:'/ClientRequest/All',
            }),
            providesTags:['Request']
        }),
        deleteRequests:build.mutation<void , number>({
            query :(id)=>({
                url:`/ClientRequest/${id}`,
                method:"DELETE"
            }),
            invalidatesTags:['Request']
        }),
        addRequests:build.mutation<void , IRequestContact>({
            query :(body)=>({
                url:`ClientRequest/Submit`,
                method:"POST",
                body,
            }),
            invalidatesTags:['Request']
        })
    })
})

export  default RequestApiSlice.reducer;
export const {useGetRequestsQuery,useDeleteRequestsMutation,useAddRequestsMutation}=RequestApiSlice; 