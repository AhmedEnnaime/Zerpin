import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import IUser from "../../Interfaces/User";

export interface AuthState {
  lname: string | null;
  token: string | null;
  user: IUser | null;
}

const initialState: AuthState = {
  lname: null,
  token: null,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ lname: string; token: string }>
    ) => {
      sessionStorage.setItem(
        "user",
        JSON.stringify({
          lname: action.payload.lname,
          token: action.payload.token,
        })
      );
      state.lname = action.payload.lname;
      state.token = action.payload.token;
    },
    logout: () => {
      sessionStorage.clear();
      initialState;
    },
    getAuthUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
  },
});

export const selectAuth = (state: RootState) => state.auth;
export const { setUser, logout, getAuthUser } = authSlice.actions;
export default authSlice.reducer;

// id: number;
// fname: string;
// lname: string;
// birthday: string;
// cin: string;
// phone: string;
// email: string;
// password: string;
// img: string;
// role: "ADMIN" | "CHEF" | "EMPLOYEE";
// department_id: number;
// created_at: string;
// updated_at: string;
// department: IDepartment;
// contract: IContract | null;
// token: string;

// id: null,
// fname: null,
// lname: null,
// birthday: null,
// cin: null,
// phone: null,
// email: null,
// password: null,
// img: null,
// role: null,
// department_id: null,
// created_at: null,
// updated_at: null,
// department: null,
// contract: null,
// token: null,
