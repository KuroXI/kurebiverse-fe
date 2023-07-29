import { configureStore } from "@reduxjs/toolkit";
import { animeApi } from "./services/animeapi";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    [animeApi.reducerPath]: animeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(animeApi.middleware),
});
