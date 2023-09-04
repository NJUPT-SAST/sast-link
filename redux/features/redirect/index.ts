import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { redirect: string | null } = {
  redirect: null,
};

const redirect = createSlice({
  name: "redirect",
  initialState,
  reducers: {
    setRedirect: (state, action: PayloadAction<string | null>) => {
      state.redirect = action.payload;
    },
    clearRedirect: (state) => {
      state.redirect = null;
    },
  },
});
