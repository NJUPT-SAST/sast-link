import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PanelState {
  homeAppPanel: boolean;
  homeInfoPanel: boolean;
}

const initialState: PanelState = {
  homeAppPanel: false,
  homeInfoPanel: false,
};

const panelState = createSlice({
  name: "panelState",
  initialState,
  reducers: {
    handleHomeAppPanel: (state, action: PayloadAction<boolean>) => {
      state.homeAppPanel = action.payload;
    },
    handleHomeInfoPanel: (state, action: PayloadAction<boolean>) => {
      state.homeInfoPanel = action.payload;
    },
  },
});

export const { handleHomeAppPanel, handleHomeInfoPanel } = panelState.actions;

export default panelState.reducer;
