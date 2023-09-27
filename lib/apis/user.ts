import { apis } from ".";
import qs from "querystring";
import { ResType } from "./type";

/**
 * 用户登录
 * @param password 用户密码
 * @returns 返回用户Token
 */
export function userLogin(password: string, loginTicket: string) {
  const formData = new FormData();
  formData.append("password", password);
  return apis.post<ResType<{ loginToken: string }>>(
    "/apis/user/login",
    formData,
    {
      headers: {
        "LOGIN-TICKET": loginTicket,
      },
    },
  );
}

/**
 * 获取用户信息
 * @returns 返回用户 Token
 */
export function getUserInfo() {
  return apis.get<ResType<{ email: string }>>("/apis/user/info", {
    headers: {
      Token: JSON.parse(localStorage.getItem("Token") ?? ""),
    },
  });
}

/**
 * 用户退出登录
 * @returns 返回用户 Token
 */
export function userLogout() {
  return apis.post<ResType<null>>(
    "/apis/user/logout",
    {},
    { headers: { Token: localStorage.getItem("Token") } },
  );
}
