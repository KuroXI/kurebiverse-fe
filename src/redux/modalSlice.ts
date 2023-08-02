import { createSlice } from "@reduxjs/toolkit";

type initStateType = {
  isModalOpen: boolean;
  animeName: string;
};

const initialState: initStateType = {
  isModalOpen: false,
  animeName: "",
};

const modalSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setModalState: (state, action) => {
      state.isModalOpen = action.payload.isModalOpen;
      state.animeName = action.payload.animeName;
    },
  },
});

export const { setModalState } = modalSlice.actions;
export default modalSlice.reducer;
