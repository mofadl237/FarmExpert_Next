import { configureStore } from "@reduxjs/toolkit";
import { FarmApiSlice } from "./services/Farm";
import { ManagerApiSlice } from "./services/Manager";
import { RequestApiSlice } from "./services/Request";
import { LoginApiSlice } from "./services/Login";
import { ManagerFarmApiSlice } from "./services/ManagerFarm";
import { ECommerceApi } from "./services/ECommerce";
import  cartSlice  from "./Cart/CartSlice";

export const store = configureStore({
  reducer: {
    cart:cartSlice,
    [FarmApiSlice.reducerPath]: FarmApiSlice.reducer,
    [ManagerApiSlice.reducerPath]: ManagerApiSlice.reducer,
    [RequestApiSlice.reducerPath]:RequestApiSlice.reducer,
    [LoginApiSlice.reducerPath]:LoginApiSlice.reducer,
    [ManagerFarmApiSlice.reducerPath]:ManagerFarmApiSlice.reducer,
    [ECommerceApi.reducerPath]:ECommerceApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(FarmApiSlice.middleware)
      .concat(ManagerApiSlice.middleware)
      .concat(RequestApiSlice.middleware)
      .concat(LoginApiSlice.middleware)
      .concat(ManagerFarmApiSlice.middleware)
      .concat(ECommerceApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
