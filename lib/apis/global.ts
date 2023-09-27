import { apis } from ".";
import qs from "querystring";
import { ResType } from "./type";
/**
 * 验证账户有效性
 * @param username 用户名
 * @returns
 */
export function veriRegistAccount(username: string) {
  return apis.get<ResType<{ registerTicket: string }>>("/apis/verify/account", {
    params: { username: username, flag: 0 },
  });
}

export function veriLoginAccount(username: string) {
  return apis.get<ResType<{ loginTicket: string }>>("/apis/verify/account", {
    params: { username: username, flag: 1 },
  });
}

export function veriResetAccount(username: string) {
  return apis.get<ResType<{ resetPwdTicket: string }>>("/apis/verify/account", {
    params: { username: username, flag: 2 },
  });
}

/**
 * 发送验证邮件
 * @param ticket 验证账号存在性后返回的 Ticket
 * @param type 当 type 为 reset 时，为重置账号，其他时为注册账号用。
 * @returns
 */
export function sendMail(ticket: string, type?: "reset") {
  if (type === "reset")
    return apis.get<ResType<null>>("/apis/sendEmail", {
      headers: {
        "RESETPWD-TICKET": ticket,
      },
    });
  return apis.get<ResType<null>>("/apis/sendEmail", {
    headers: {
      "REGISTER-TICKET": ticket,
    },
  });
}

/**
 * 校验验证码
 * @param ticket 验证账号存在性后返回的 Ticket
 * @param captcha 验证码
 * @returns
 */
export function veriCaptcha(ticket: string, captcha: string, type?: "reset") {
  if (type && type === "reset") {
    return apis.post<ResType<null>>(
      "/apis/verify/captcha",
      qs.stringify({ captcha: "S-" + captcha }),
      {
        headers: {
          "RESETPWD-TICKET": ticket,
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
      },
    );
  }

  return apis.post<ResType<null>>(
    "/apis/verify/captcha",
    qs.stringify({ captcha: "S-" + captcha }),
    {
      headers: {
        "REGISTER-TICKET": ticket,
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
    },
  );
}

/**
 * 用于用户注册，设置用户密码
 * @param username 用户名
 * @param password 用户密码
 * @returns 返回用户 Token
 */
export function userRegist(password: string, registTicket: string) {
  return apis.post<ResType<null>>(
    "/apis/user/register",
    qs.stringify({
      password: password,
    }),
    {
      headers: {
        "REGISTER-TICKET": registTicket,
      },
    },
  );
}

export function resetPassword(password: string, resetTicket: string) {
  return apis.post<ResType<null>>(
    "/apis/user/resetPassword",
    qs.stringify({
      newPassword: password,
    }),
    {
      headers: {
        "RESETPWD-TICKET": resetTicket,
      },
    },
  );
}
