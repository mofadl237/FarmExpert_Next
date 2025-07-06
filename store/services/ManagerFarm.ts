import { ICattle, IMilk, IWorker } from "@/interface";
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
        console.log("token");
        if (token) headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (build) => ({

    //1-Gets

    getWorker: build.query<IWorker[], void>({
      query: () => ({
        url: "/Worker/all",
      }),
      providesTags: ["ManagerFarm"],
    }),
    getCattle: build.query<ICattle[], { typeCattle: string }>({
      query: ({ typeCattle }) => ({
        url: `/Cattle/GetCattlesByType/${typeCattle}`,
      }),
      providesTags: ["ManagerFarm"],
    }),
    getMilk: build.query<IMilk[], void>({
      query: () => ({
        url: `/MilkProduction/All`,
      }),
      providesTags: ["ManagerFarm"],
    }),

    //2- Add

    addWork: build.mutation<void, FormData>({
      query: (formData) => ({
        url: "/Worker/AddWorker",
        method: "Post",
        body: formData,
      }),
      invalidatesTags: ["ManagerFarm"],
    }),
    addCattle: build.mutation<void, FormData>({
      query: (formData) => ({
        url: "/Cattle/AddCattle",
        method: "Post",
        body: formData,
      }),
      invalidatesTags: ["ManagerFarm"],
    }),
    addMilk: build.mutation<void, IMilk>({
      query: (body) => ({
        url: "/MilkProduction/Add",
        method: "Post",
        body,
      }),
      invalidatesTags: ["ManagerFarm"],
    }),

    //3- Update

    updateWork: build.mutation<void, { id: number; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/Worker/UpdateWorker/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["ManagerFarm"],
    }),
    updateCattle: build.mutation<void, { id: number; body: ICattle }>({
      query: ({ id, body }) => ({
        url: `/Cattle/UpdateCattle/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["ManagerFarm"],
    }),
    updateMilk: build.mutation<void, { id: number; body: IMilk }>({
      query: ({ id, body }) => ({
        url: `/MilkProduction/Edit/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["ManagerFarm"],
    }),

    //4- Delete

    deleteWork: build.mutation<void, { id: number }>({
      query: ({ id }) => ({
        url: `/Worker/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ManagerFarm"],
    }),
    deleteCattle: build.mutation<void, { id: number }>({
      query: ({ id }) => ({
        url: `Cattle/DeleteCattle/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ManagerFarm"],
    }),
    deleteMilk: build.mutation<void, { id: number }>({
      query: ({ id }) => ({
        url: `/MilkProduction/Delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ManagerFarm"],
    }),
  }),
});

export default ManagerFarmApiSlice.reducer;
export const {
  useGetWorkerQuery,
  useAddWorkMutation,
  useDeleteWorkMutation,
  useUpdateWorkMutation,
  useGetCattleQuery,
  useAddCattleMutation,
  useUpdateCattleMutation,
  useDeleteCattleMutation,
  useGetMilkQuery,
  useAddMilkMutation,
  useUpdateMilkMutation,
  useDeleteMilkMutation,
} = ManagerFarmApiSlice;
