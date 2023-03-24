import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import IDepartment from "../../Interfaces/Department";

interface DepartmentState {
  department: IDepartment | null;
}

const initialState: DepartmentState = {
  department: null,
};

export const departmentSlice = createSlice({
  name: "department",
  initialState,
  reducers: {
    setDepartment: (state, action: PayloadAction<IDepartment>) => {
      state.department = action.payload;
    },
  },
});

export const selectDepartment = (state: RootState) => state.department;
export const { setDepartment } = departmentSlice.actions;
export default departmentSlice.reducer;
