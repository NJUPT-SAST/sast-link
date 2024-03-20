import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const isServer = typeof window === "undefined";

interface UserList {
  Token: string;
  avator?: string | null;
  nickName?: string;
  email: string;
  userId: string;
}

const initialState: UserList[] = isServer
  ? []
  : (() => {
      const localUserList = JSON.parse(
        localStorage.getItem("userList") ?? "[]",
      ) as UserList[];
      if (localUserList.length && typeof localUserList.length === "number") {
        if (
          localUserList.every((item) => {
            return item.email && item.nickName && item.Token && item.userId;
          })
        ) {
          return localUserList;
        }
      }
      localStorage.setItem("userList", "[]");
      return [];
    })();

// 存储已登陆用户
// 该功能待完善
const UserListSlice = createSlice({
  name: "userList",
  initialState,
  reducers: {
    // 添加已登陆用户
    addAccount: (state, action: PayloadAction<UserList>) => {
      // 添加账户，更新localStorage
      let isExisted = false;
      // 验证是否已存在
      state.forEach((value) => {
        if (value.userId === action.payload.userId) {
          isExisted = true;
        }
      });
      if (!isExisted) {
        state.push(action.payload);
        localStorage.setItem("userList", JSON.stringify(state));
      }
    },
    updateAccount: (
      state,
      action: PayloadAction<{
        nickname: string;
        email: string;
        avater: string | null;
      }>,
    ) => {
      let isExisted = false;
      // 验证是否已存在
      state.forEach((value) => {
        if (value.email === action.payload.email) {
          isExisted = true;
        }
      });
      if (isExisted) {
        const { nickname, email, avater } = action.payload;
        const user = state.find((user) => user.email === email);
        if (user) {
          user.nickName = nickname;
          user.email = email;
          user.avator = avater;
        }
        localStorage.setItem("userList", JSON.stringify(state));
      }
    },
    // 移除已登录用户
    removeAccount: (state, action: PayloadAction<number | string>) => {
      // 删除账户 更新localStorage
      if (typeof action.payload === "number") state.splice(action.payload, 1);
      else
        state = state.filter((value) => {
          value.email !== action.payload;
        });
      localStorage.setItem("userList", JSON.stringify(state));
    },
  },
});

export const { removeAccount, addAccount, updateAccount } =
  UserListSlice.actions;

export default UserListSlice.reducer;
