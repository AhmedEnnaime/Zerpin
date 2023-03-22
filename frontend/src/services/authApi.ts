import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import IUser from "../Interfaces/User";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost/api",
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (body: { email: string; password: string }) => {
        return {
          url: "/login",
          method: "post",
          body,
        };
      },
    }),
    logoutUser: builder.mutation({
      query: () => {
        return {
          url: "/logout",
          method: "post",
        };
      },
    }),

    getMe: builder.query<IUser, null>({
      query: () => {
        return {
          url: "/userAuth",
          method: "get",
          headers: {
            Authorization: `Bearer ${
              JSON.parse(sessionStorage.getItem("user") || "{}").token
            }`,
          },
        };
      },
    }),
  }),
});

export const { useLoginUserMutation, useLogoutUserMutation, useGetMeQuery } =
  authApi;
