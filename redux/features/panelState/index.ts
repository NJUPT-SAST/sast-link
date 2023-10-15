import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PanelState {
  homeAppPanel: boolean; // 对应 Home 界面 AppPanel
  homeInfoPanel: boolean; // 对应 Home 界面 InfoPanel
}

const initialState: PanelState = {
  homeAppPanel: false,
  homeInfoPanel: false,
};

// 控制某些面板的开启与关闭
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
