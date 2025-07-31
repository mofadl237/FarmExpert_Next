import { ICattleECommerce, ICattleECommerceResponse } from "@/interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ECommerceApi = createApi({
  reducerPath: "ECommerce",
  tagTypes: ["ECommerce"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://farmxpertapi.runasp.net/api/v2",
  }),
  endpoints: (build) => ({
    getCattleECommerce: build.query<ICattleECommerceResponse, void>({
      query: () => ({
        url: "/Products/AllCattle?page=1&pageSize=8&sort=desc",
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
  }),
});

export default ECommerceApi.reducer;
export const { useGetCattleECommerceQuery,
     useGetCattleECommerceByIDQuery ,
     useGetCattleECommerceByTypeQuery,

} =
  ECommerceApi;
