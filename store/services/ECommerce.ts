import { ICattleECommerce, ICattleECommerceResponse, IMilkECommerceResponse } from "@/interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ECommerceApi = createApi({
  reducerPath: "ECommerce",
  tagTypes: ["ECommerce"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://farmxpertapi.runasp.net/api/v2",
  }),
  endpoints: (build) => ({
    getCattleECommerce: build.query<ICattleECommerceResponse, {page:number , limit:number}>({
      query: ({page,limit}) => ({
        url: `/Products/AllCattle?page=${page}&pageSize=${limit}&sort=desc`,
      }),
      providesTags: ["ECommerce"],
    }),
    getCattleECommerceByType: build.query<
      ICattleECommerceResponse,
      { type: string }
    >({
      query: ({type}) => ({
        url: `/Products/AllCattle?type=${type}&page=1&pageSize=8`,
      }),
      providesTags: ["ECommerce"],
    }),
    getCattleECommerceByID: build.query<ICattleECommerce, { id: number }>({
      query: ({ id }) => ({
        url: `/Products/Cattle/${id}`,
      }),
      providesTags: ["ECommerce"],
    }),
    getMilkECommerce:build.query<IMilkECommerceResponse  , {page:number,limit:number}>({
      query:({page,limit})=>({
        url:`/MilkStore/AllMilk?page=${page}&pageSize=${limit}`
      }),
      providesTags: ["ECommerce"],
    }),

    
  }),
});

export default ECommerceApi.reducer;
export const { useGetCattleECommerceQuery,
     useGetCattleECommerceByIDQuery ,
     useGetCattleECommerceByTypeQuery,
     useGetMilkECommerceQuery,

} =
  ECommerceApi;
