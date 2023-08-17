"use client";

import React, { ReactNode, useCallback, useState } from "react";
import { LoginStep1 } from "./loginStep1";
import { LoginStep2 } from "./loginStep2";
import { useSearchParams } from "next/navigation";
import axios from "axios";

export const metadata = {
  title: "SAST Link Login",
  description: "OAuth of SAST",
};

export interface LoginContextProps {
  redirect: null | string;
  loginTicket?: string;
  handleTitle: (title: string) => void;
  handleStep: (step: 1 | -1) => void;
  handleTicket: (ticket: string) => void;
}

export const LoginContext = React.createContext<LoginContextProps>({
  redirect: null,
  handleTitle: (title: string) => void 0,
  handleStep: (step: 1 | -1) => void 0,
  handleTicket: () => void 0,
});

const Login = () => {
  const searchParams = useSearchParams();
  // redirect 表示登陆后应重定向的位置若为 null 则重定向至首页
  const redirect = searchParams.get("redirect");
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
