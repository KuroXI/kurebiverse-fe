import { createSlice } from "@reduxjs/toolkit";
import { UserInitialState } from "@/type/Redux";

const initialState: UserInitialState = {} as UserInitialState;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.userId = action.payload.userId;
      state.username = action.payload.username;
      state.profileUrl = action.payload.profileUrl;
      state.coverUrl = action.payload.coverUrl;
      state.email = action.payload.email;
    },
  },
});

export const { setUserDetails } = userSlice.actions;
export default userSlice.reducer;
