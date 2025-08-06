import { IUserResponse } from "@/interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ECommerceAuthApi = createApi({
  reducerPath: "ECommerceAuth",
  tagTypes: ["ECommerceAuth"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://ecommer.runasp.net/api/UserAuth",
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
   registerUser:build.mutation<void,{email:string , password:string,name:string,ConfirmPassword:string}>({
            query:(body)=>({
                url:'/Register',
                method:'POST',
                body:body
            }),
            invalidatesTags:['ECommerceAuth']
        }),
   forgetPassWordUser:build.mutation<{str:string},{email:string }>({
            query:(body)=>({
                url:'/ForgotPassword',
                method:'POST',
                body:body
            }),
            invalidatesTags:['ECommerceAuth']
        }),
   resetPassword:build.mutation<{str:string},{email:string,code:string,NewPassword:string }>({
            query:(body)=>({
                url:'/ResetPasswordWithCode',
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
useRegisterUserMutation,
useForgetPassWordUserMutation,
useResetPasswordMutation
} =
  ECommerceAuthApi;
