import { IUserResponse } from "@/interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ECommerceAuthApi = createApi({
  reducerPath: "ECommerceAuth",
  tagTypes: ["ECommerceAuth"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://e-commer.runasp.net/api/UserAuth",
  }),
  endpoints: (build) => ({
   loginUser:build.mutation<IUserResponse,{email:string , password:string}>({
            query:(body)=>({
                url:'/Login',
                method:'POST',
                body:body
            }),
            invalidatesTags:['ECommerceAuth']
        }),

    
  }),
});

export default ECommerceAuthApi.reducer;
export const { 
useLoginUserMutation,

} =
  ECommerceAuthApi;
