import { configureStore } from "@reduxjs/toolkit";
import { FarmApiSlice } from "./services/Farm";
import { ManagerApiSlice } from "./services/Manager";

export const store = configureStore({
  reducer: {
    [FarmApiSlice.reducerPath]: FarmApiSlice.reducer,
    [ManagerApiSlice.reducerPath]: ManagerApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(FarmApiSlice.middleware)
      .concat(ManagerApiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
