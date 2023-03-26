import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../services/authApi";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import authReducer from "./slices/authSlice";
import departmentReducer from "./slices/departmentSlice";
import recruitmentReducer from "./slices/recruitmentSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    department: departmentReducer,
    recruitment: recruitmentReducer,
    [authApi.reducerPath]: authApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
setupListeners(store.dispatch);
