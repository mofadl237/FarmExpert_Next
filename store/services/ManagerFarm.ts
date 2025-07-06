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
    }),
    updateWork: build.mutation<void, { id: number; formData: FormData }>({
  query: ({ id, formData }) => ({
    url: `/Worker/UpdateWorker/${id}`,
    method: "PUT",
    body: formData,
  }),
  invalidatesTags: ['ManagerFarm'],
}),

    deleteWork:build.mutation<void ,  {id:number}>({
      query:(id)=>({
        url:`/Worker/delete/${id}`,
        method:"DELETE",
      }),
      invalidatesTags:['ManagerFarm']
    }),


  }),
});

export default ManagerFarmApiSlice.reducer;
export const {useGetWorkerQuery,useAddWorkMutation,useDeleteWorkMutation,useUpdateWorkMutation}=ManagerFarmApiSlice;