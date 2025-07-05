import { IWorker } from "@/interface";
import { getToken } from "@/lib/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ManagerFarmApiSlice = createApi({
  reducerPath: "FarmManager",
  tagTypes: ["ManagerFarm"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://farmxpertapi.runasp.net/api",
    prepareHeaders: (headers) => {
     if (typeof window !== "undefined") {
      const token = getToken();
      console.log('token')
      if (token) headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
  }),
  endpoints: (build) => ({
    getWorker: build.query<IWorker[],void>({
      query: () => ({
        url: "/Worker/all",
      }),
      providesTags:['ManagerFarm'],
    }),
    addWork:build.mutation<void ,  FormData>({
      query:(formData)=>({
        url:'/Worker/AddWorker',
        method:"Post",
        body:formData,
      }),
      invalidatesTags:['ManagerFarm']

    })
  }),
});

export default ManagerFarmApiSlice.reducer;
export const {useGetWorkerQuery,useAddWorkMutation}=ManagerFarmApiSlice;