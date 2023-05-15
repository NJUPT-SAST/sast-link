import { apis } from ".";

/**
 * 用于用户注册
 * @param username 用户名
 * @param password 用户密码
 * @param code 验证码
 * @returns 返回用户 Token
 */
export function userRegist(username: string, password: string, code: string) {
  apis.post<{ Token: string }>("/user/register", {
    username: username,
    password: password,
    code: code,
  });
}

/**
 * 用户登录
 * @param password 用户密码
 * @returns 返回用户Token
 */
export function userLogin(password: string) {
  const loginTicket = localStorage.getItem("loginTicket");
  return apis.post<{ Token: string }>(
    "/user/login",
    {
      password: password,
    },
    {
      headers: {
        LOGIN_TICKET: loginTicket,
      },
    },
  );
}

/**
 * 获取用户信息
 * @returns 返回用户 Token
 */
export function getUserInfo() {
  return apis.get<{ Token: string }>("/user/info");
}

/**
 * 用户退出登录
 * @returns 返回用户 Token
 */
export function userLogout() {
  return apis.post<{ Token: string }>(
    "/user/logout",
    {},
    { headers: { TOKEN: true } },
  );
}
