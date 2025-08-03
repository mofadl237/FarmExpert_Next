import { IAddMilkECommerce, IAlert, ICattle, ICattleAddSuccess, IMilk, IPaginatedEventResponse, ISendNotification, IWorker, PaginatedCattleResponse, PaginatedMilkResponse } from "@/interface";
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
    //done
    getCattle: build.query<PaginatedCattleResponse, { typeCattle: string, limit: number, sort: string, page: number }>({
  query: ({ typeCattle, limit, sort, page }) => ({
    url: `/Cattle/GetCattlesByType/${typeCattle}?pageSize=${limit}&sort=${sort}&page=${page}`,
  }),
  providesTags: ["ManagerFarm"],
}),
//done
    getMilk: build.query<PaginatedMilkResponse, {limit:number,sort:string,page:number}>({
      query: ({limit,sort,page}) => ({
        url: `/MilkProduction/All?pageSize=${limit}&sort=${sort}&sortBy=total&page=${page}`,
      }),
      providesTags: ["ManagerFarm"],
    }),

    getAlerts:build.query <IAlert[],void>({
      query:()=>({
        url:`/Notification/all-worker-notifications`
      }),
      providesTags: ["ManagerFarm"],
    }),
    getAlertsWorker:build.query <IAlert[],string>({
      query:(email)=>({
        url:`/Notification/worker-notifications?email=${email}`
      }),
      providesTags: ["ManagerFarm"],
    }),
    //done
getEvents:build.query<IPaginatedEventResponse,{sort:string,limit:number,type:string,page:number}>({
  query:({sort,type,limit,page})=>({
    url: `/CattleActivityIND/AllEvents?sort=${sort}&&page=${page}&pageSize=${limit}&eventType=${type}`,
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
    addCattleECommerce: build.mutation<ICattleAddSuccess, FormData>({
      query: (formData) => ({
        url: "/v2/Products/AddCattle",
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
    addMilkECommerce: build.mutation<{ message: string; milkProductID: number }, IAddMilkECommerce>({
      query: (body) => ({
        url: "/v2/MilkStore/AddMilk",
        method: "Post",
        body,
      }),
      invalidatesTags: ["ManagerFarm"],
    }),
    addNotification: build.mutation<void, ISendNotification>({
      query: (body) => ({
        url: "/Notification/custom",
        method: "Post",
        body,
      }),
      invalidatesTags: ["ManagerFarm"],
    }),
addCattleActivity:build.mutation<void,FormData>({
  query:(body)=>({
    url:'/CattleActivityIND/AddEvent',
    method:"POST",
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
    updateEvent: build.mutation<void, { id: number; body:FormData }>({
      query: ({ id, body }) => ({
        url: `/CattleActivityIND/EditEvent/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["ManagerFarm"],
    }),

    readAlert:build.mutation<void,{id:number}>({
      query:({id})=>({
        url:`/Notification/mark-as-read/${id}`,
        method:"PUT"
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
    deleteNotification:build.mutation<void, {id:number}>({
      query:({id})=>({
        url:`/Notification/delete/${id}`,
        method:"DELETE"
      }),
      invalidatesTags: ["ManagerFarm"],
    }),
    deleteEvent:build.mutation<void, {id:number}>({
      query:({id})=>({
        url:`/CattleActivityIND/DeleteEvent/${id}`,
        method:"DELETE"
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
  useAddNotificationMutation,
  useGetAlertsQuery,
  useDeleteNotificationMutation,
  useGetAlertsWorkerQuery,
  useReadAlertMutation,
  useAddCattleActivityMutation,
  useGetEventsQuery,
  useDeleteEventMutation,
  useUpdateEventMutation,
  useAddCattleECommerceMutation,
  useAddMilkECommerceMutation,
} = ManagerFarmApiSlice;
