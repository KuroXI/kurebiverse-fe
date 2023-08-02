import { configureStore } from "@reduxjs/toolkit";
import { animeApi } from "./services/animeapi";
import userReducer from "./userSlice";
import modalReducer from "./modalSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    modal: modalReducer,
    [animeApi.reducerPath]: animeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(animeApi.middleware),
});
