import { IFarm } from "@/interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const FarmApiSlice = createApi({
  reducerPath: "farm",
  tagTypes: ["Farms" ,'Manager'],
  baseQuery: fetchBaseQuery({ baseUrl: "https://farmxpertapi.runasp.net/api" }),
  endpoints: (build) => ({
    getFarms: build.query<IFarm[], void>({
      query: () => ({
        url: "/Farms/All",
      }),
      providesTags: ["Farms" ,'Manager'],
    }),

    addFarm: build.mutation<void, { name: string }>({
      query: (body) => ({
        url: "/Farms/add",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Farms" ,'Manager'],
    }),

    deleteFarm: build.mutation<void, number>({
      query: (id) => ({
        url: `/Farms/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Farms" ,'Manager']
    }),

    updateFarm: build.mutation<void, { id: number; name: string }>({
      query: ({ id, name }) => ({
        url: `/Farms/update/${id}`,
        method: "PUT",
        body: {
          name,
        },
      }),
      invalidatesTags: ["Farms" ,'Manager']
    }),
  }),
});

export default FarmApiSlice.reducer;
export const {
  useGetFarmsQuery,
  useAddFarmMutation,
  useDeleteFarmMutation,
  useUpdateFarmMutation,
} = FarmApiSlice;
