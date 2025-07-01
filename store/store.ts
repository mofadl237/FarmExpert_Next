import { configureStore } from '@reduxjs/toolkit'
import { FarmApiSlice} from './services/Farm'

export const store = configureStore({
  reducer: {
    [FarmApiSlice.reducerPath]: FarmApiSlice.reducer,
  },
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(FarmApiSlice.middleware),
})



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

