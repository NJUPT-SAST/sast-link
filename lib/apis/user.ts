import { apis } from ".";
import type { EditableProfileType, ResType, UserProfileType } from "./type";

/**
 * 用户登录
 * @param password 用户密码
 * @returns 返回用户Token
 */
export function userLogin(
  password: string,
  loginTicket: string,
  oauthTicket?: string | null,
) {
  const formData = new FormData();
  formData.append("password", password);
  return apis.post<ResType<{ "sast-link-access-token": string }>>(
    "/apis/user/login",
    formData,
  );
}

/**
 * 获取用户信息
 * @returns 返回用户 Token
 */
export function getUserInfo() {
  return apis.get<ResType<{ email: string; userId: string }>>(
    "/apis/user/info",
  );
}

/**
 * 用户退出登录
 * @returns 返回用户 Token
 */
export function userLogout() {
  return apis.post<ResType<null>>("/apis/user/logout");
}

/**
 * 获取详尽的用户个人信息
 * @returns
 */
export function getUserProfile() {
  return apis.get<ResType<UserProfileType>>("/apis/profile/getProfile");
}

/**
 * 修改用户 profile
 * @param data 修改的信息
 * @returns
 */
export function EditProfile(data: EditableProfileType) {
  return apis.post<ResType<null>>(
    "/apis/profile/change",
    { ...data },
    { headers: { Token: JSON.parse(localStorage.getItem("Token") ?? "") } },
  );
}

/**
 * 修改用户头像
 */

export function uploadAvatar(file: Blob) {
  const formData = new FormData();
  formData.append("avatarFile", file);
  return apis.post<ResType<{ filePath: string }>>(
    "/apis/profile/uploadAvatar",
    formData,
    { headers: { Token: JSON.parse(localStorage.getItem("Token") ?? "") } },
  );
}

export function getUserBindStatus() {
  return apis.get<ResType<string[]>>("/apis/profile/bindStatus", {
    headers: { Token: JSON.parse(localStorage.getItem("Token") ?? "") },
  });
}
