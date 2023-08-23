"use client";

import React, { useCallback, useState } from "react";
import { LoginStep1 } from "./loginStep1";
import { LoginStep2 } from "./loginStep2";
import { useSearchParams } from "next/navigation";

const metadata = {
  title: "SAST Link Login",
  description: "OAuth of SAST",
};

export interface LoginContextProps {
  redirectParams: null | string;
  redirect: null | string;
  loginTicket?: string;
  handleTitle: (title: string) => void;
  handleStep: (step: 1 | -1) => void;
  handleTicket: (ticket: string) => void;
}

export const LoginContext = React.createContext<LoginContextProps>({
  redirectParams: null,
  redirect: null,
  handleTitle: (title: string) => void 0,
  handleStep: (step: 1 | -1) => void 0,
  handleTicket: () => void 0,
});

const Login = () => {
  const searchParams = useSearchParams();
  // redirect 表示登陆后应重定向的位置若为 null 则重定向至首页
  // TODO 错误处理
  const redirectParams = searchParams.get("redirect");
  const redirect = redirectParams ?
    redirectParams?.split("?")[0] +
    "?" +
    JSON.parse(redirectParams?.split("?")[1] ?? "[]").join("&") : null;
  const [step, setStep] = useState<number>(1);
  const [loginTicket, setLoginTicket] = useState<string>();
  const [title, setTitle] = useState<string>("<sast link>");
  const handleStep = useCallback((step: -1 | 1) => {
    setStep((pre) => pre + step);
  }, []);

  // 设置标题
  const handleTitle = useCallback((title: string) => setTitle(title), []);
  const handleTicket = useCallback(
    (ticket: string) => setLoginTicket(ticket),
    []
  );

  const providerValue = {
    redirectParams,
    redirect,
    loginTicket: loginTicket,
    handleStep: handleStep,
    handleTitle: handleTitle,
    handleTicket: handleTicket,
  };
  return (
    <>
      <div className={"pageTitle"}>{title}</div>
      <div className={"globalContainer"}>
        <LoginContext.Provider value={providerValue}>
          {step === 1 ? <LoginStep1 /> : <LoginStep2 />}
        </LoginContext.Provider>
      </div>
    </>
  );
};

export default Login;
