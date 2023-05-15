import { apis } from ".";

/**
 * 验证账户存在性
 * @param username 用户名
 * @param flag 标志 取 0 或者 1， 0 表示注册，1 表示登录
 * @returns
 */
export function veriAccount(username: string, flag?: number) {
  return apis.get<{ exists: boolean; ticket: number }>("/verify/account", {
    params: { username: username, flag: flag },
  });
}

/**
 * 发送验证邮件
 * @returns 返回 Token
 */
export function sendMail() {
  return apis.get<{ Token: string }>("/sendEmail");
}
