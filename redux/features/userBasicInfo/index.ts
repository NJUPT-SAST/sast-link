import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { UserProfileType } from "@/lib/apis/type";

const initialState: UserProfileType = {
  nickname: "~",
  email: "~",
  dep: null,
  org: null,
  avatar: null,
  bio: null,
  link: null,
  badge: null,
  hide: null,
};

interface EditableProfileType {
  nickname: string | null;
  dep: string | null;
  org: string | null;
  bio: string;
  link: string[] | null;
  hide: string[] | null;
}

// 用于临时存储用户信息
const userBasicInfo = createSlice({
  name: "userBasicInfo",
  initialState,
  reducers: {
    // 设置用户信息
    setUserBasicInfo: (state, action: PayloadAction<UserProfileType>) => {
      return action.payload;
    },
    // 更新当前用户信息
    updateBasicInfo: (state, action: PayloadAction<EditableProfileType>) => {
      return { ...state, ...action };
    },
    resetBasicInfo: () => {
      return initialState;
    },
  },
});

export const { setUserBasicInfo, updateBasicInfo, resetBasicInfo } =
  userBasicInfo.actions;

export default userBasicInfo.reducer;
