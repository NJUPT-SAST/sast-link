import { apis } from "./index";

interface oAuthType {
  /**
   * 客户端Id
   */
  client_id: string | null;
  code_chalenge: string | null;
  code_chalengeMethiod: string | null;
  /**
   * 任务完成后重定向的链接
   */
  redirect_uri: string | null;
  /**
   * 授权码模式
   */
  resonse_type: string | null;
  scope: string | null;
  state: string | null;
}

export function oAuth(data: oAuthType) {
  const queryArray: string[] = [];
  Object.keys(data).forEach((key) => {
    if ((data as any)[key]) queryArray.push(`${key}=${(data as any)[key]}`);
  });
  const query = queryArray.join("&");
  return apis.get(`/oauth/authorize?${query}`);
}
