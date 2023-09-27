import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";

interface Message {
  icon: null | "info" | "error" | "warning" | "success" | "loading";
  content: null | string;
  delay?: null | number;
}

const initialState: Message = {
  icon: null,
  content: null,
};

const content = createSlice({
  name: "content",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      state.icon = action.payload.icon;
      state.content = action.payload.content;
    },
    removeMessage: (state) => {
      state.icon = null;
      state.content = null;
    },
    replaceMessage: (state, action: PayloadAction<Message>) => {
      state.icon = action.payload.icon;
      state.content = action.payload.content;
    },
  },
});

export const { addMessage, removeMessage, replaceMessage } = content.actions;

export default content.reducer;
