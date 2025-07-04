import { configureStore } from "@reduxjs/toolkit";
import { FarmApiSlice } from "./services/Farm";
import { ManagerApiSlice } from "./services/Manager";
import { RequestApiSlice } from "./services/Request";
import { LoginApiSlice } from "./services/Login";

export const store = configureStore({
  reducer: {
    [FarmApiSlice.reducerPath]: FarmApiSlice.reducer,
    [ManagerApiSlice.reducerPath]: ManagerApiSlice.reducer,
    [RequestApiSlice.reducerPath]:RequestApiSlice.reducer,
    [LoginApiSlice.reducerPath]:LoginApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(FarmApiSlice.middleware)
      .concat(ManagerApiSlice.middleware)
      .concat(RequestApiSlice.middleware)
      .concat(LoginApiSlice.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
