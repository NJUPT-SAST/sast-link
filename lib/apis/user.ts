import { apis } from ".";
import qs from "querystring";

/**
 * 用户登录
 * @param password 用户密码
 * @returns 返回用户Token
 */
export function userLogin(password: string, loginTicket: string) {
  return apis.post<{ Data: { token: string } }>(
    "/apis/user/login",
    qs.stringify({ password: password }),
    {
      headers: {
        "LOGIN-TICKET": loginTicket,
      },
    }
  );
}

/**
 * 获取用户信息
 * @returns 返回用户 Token
 */
export function getUserInfo() {
  return apis.get<{Data:{email:string},Success:boolean}>("/apis/user/info", {
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
  return apis.post<{ Token: string }>(
    "/apis/user/logout",
    {},
    { headers: { Token: localStorage.getItem("Token") } }
  );
}
