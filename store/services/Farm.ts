import { IFarm } from "@/interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const FarmApiSlice = createApi({
  reducerPath: "farm",
  tagTypes: ["Farms"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://farmxpertapi.runasp.net/api" }),
  endpoints: (build) => ({
    getFarms: build.query<IFarm[], void>({
      query: () => ({
        url: "/Farms/All",
      }),
      providesTags: ["Farms"],
    }),

    addFarm: build.mutation<void, { name: string }>({
      query: (body) => ({
        url: "/Farms/add",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Farms"],
    }),

    deleteFarm: build.mutation<void, number>({
      query: (id) => ({
        url: `/Farms/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Farms"],
    }),

    updateFarm: build.mutation<void, { id: number; name: string }>({
      query: ({ id, name }) => ({
        url: `/Farms/update/${id}`,
        method: "PUT",
        body: {
          name,
        },
      }),
      invalidatesTags: ["Farms"],
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
