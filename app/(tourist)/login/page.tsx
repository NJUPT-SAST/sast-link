"use client";

import React, { ReactNode, useCallback, useState } from "react";
import { LoginStep1 } from "./loginStep1";
import { LoginStep2 } from "./loginStep2";

export const metadata = {
  title: "SAST Link Login",
  description: "OAuth of SAST",
};

export interface LoginContextProps {
  handleTitle: (title: string) => void;
  handleStep: (step: 1 | -1) => void;
}

export const LoginContext = React.createContext<LoginContextProps>({
  handleTitle: (title: string) => void 0,
  handleStep: (step: 1 | -1) => void 0,
});

const Login = (props: {
  children: ReactNode;
  loginStep1: ReactNode;
  loginStep2: ReactNode;
}) => {

  const [step, setStep] = useState<number>(1);
  const [title, setTitle] = useState<string>("<sast link>");
  const handleStep = useCallback((step: -1 | 1) => {
    setStep((pre) => pre + step);
  }, []);

  const handleTitle = useCallback((title: string) => setTitle(title), []);

  const providerValue = {
    handleStep: handleStep,
    handleTitle: handleTitle,
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
