import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import IRecruitment from "../../Interfaces/Recruitment";

interface RecruitmentState {
  recruitment: IRecruitment | null;
}

const initialState: RecruitmentState = {
  recruitment: null,
};

export const recruitmentSlice = createSlice({
  name: "recruitment",
  initialState,
  reducers: {
    setRecruitment: (state, action: PayloadAction<IRecruitment>) => {
      state.recruitment = action.payload;
    },
  },
});

export const selectRecruitment = (state: RootState) => state.recruitment;
export const { setRecruitment } = recruitmentSlice.actions;
export default recruitmentSlice.reducer;
