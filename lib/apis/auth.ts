interface oAuthType {
  /**
   * 客户端Id
   */
  client_id: string | null;
  code_challenge: string | null;
  code_challenge_method: string | null;
  /**
   * 任务完成后重定向的链接
   */
  redirect_uri: string | null;
  /**
   * 授权码模式
   */
  response_type: string | null;
  scope: string | null;
  state: string | null;
}

export function oAuth(data: oAuthType) {
  const queryArray: string[] = [];
  Object.keys(data).forEach((key) => {
    if ((data as any)[key]) queryArray.push(`${key}=${(data as any)[key]}`);
  });
  const formData = new FormData();
  const token = localStorage.getItem("Token");
  formData.append("token", token ?? "");
  const query =
    queryArray.join("&") +
    "&" +
    "part=" +
    JSON.parse(localStorage.getItem("Token") ?? "");
  // console.log(query);
  // TODO 更改为部署后地址
  return (window.location.href = `http://81.68.225.220:8080/api/v1/oauth2/authorize?${query}`);
}
