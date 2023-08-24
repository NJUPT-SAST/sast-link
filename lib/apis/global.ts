import { apis } from ".";
import qs from "querystring";
/**
 * 验证账户有效性
 * @param username 用户名
 * @returns
 */
export function veriRegistAccount(username: string) {
  return apis.get<{ Data: { register_ticket: string } }>(
    "/apis/verify/account",
    {
      params: { username: username, flag: 0 },
    }
  );
}

export function veriLoginAccount(username: string) {
  return apis.get<{ Data: { login_ticket: string } }>(
    "/apis/verify/account",
    {
      params: { username: username, flag: 1 },
    }
  );
}

/**
 * 发送验证邮件
 * @param registTicket 验证账号存在性后返回的 Ticket
 * @returns
 */
export function sendMail(registTicket: string) {
  return apis.get("/apis/sendEmail", {
    headers: {
      "REGISTER-TICKET": registTicket,
    },
  });
}

/**
 * 校验验证码
 * @param registTicket 验证账号存在性后返回的 Ticket
 * @param captcha 验证码
 * @returns
 */
export function veriCaptcha(registTicket: string, captcha: string) {
  return apis.post("/apis/verify/captcha", qs.stringify({ captcha: captcha }), {
    headers: {
      "REGISTER-TICKET": registTicket,
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
  });
}

/**
 * 用于用户注册，设置用户密码
 * @param username 用户名
 * @param password 用户密码
 * @returns 返回用户 Token
 */
export function userRegist(password: string, registTicket: string) {
  return apis.post<{ Token: string }>(
    "/apis/user/register",
    qs.stringify({
      password: password,
    }),
    {
      headers: {
        "REGISTER-TICKET": registTicket,
      },
    }
  );
}
