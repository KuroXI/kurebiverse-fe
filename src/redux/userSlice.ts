import { createSlice } from "@reduxjs/toolkit";
import {User} from "@supabase/supabase-js";

type initStateType = {
  user: User
};

const initialState: initStateType = {} as initStateType;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.user = action.payload.user;
    }
  }
});

export const { setUserDetails } = userSlice.actions;
export default userSlice.reducer;
