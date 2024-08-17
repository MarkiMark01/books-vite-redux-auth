import { createSlice } from "@reduxjs/toolkit";
import { supabase } from "../../../client";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;

export const fetchUser = () => async (dispatch) => {
  const { data } = await supabase.auth.getUser();
  if (data?.user) {
    dispatch(setUser(data.user));
  }
};

export const signOutUser = () => async (dispatch) => {
  await supabase.auth.signOut();
  dispatch(clearUser());
};

export default authSlice.reducer;