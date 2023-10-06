"use client";

import React, { useCallback, useState } from "react";
import { ResetStep1 } from "./resetStep1";
import { ResetStep2 } from "./resetStep2";
import { ResetStep3 } from "./resetStep3";
import { ResetStep4 } from "./resetStep4";
import { useSearchParams } from "next/navigation";
import { ResetContext } from "@/lib/context";

const Regist = () => {
  const [resetTicket, setResetTicket] = useState<string | undefined>();
  const [username, setUsername] = useState<string | undefined>();
  const [step, setStep] = useState<number>(1);
  const handleStep = useCallback((step: -1 | 1) => {
    setStep((pre) => pre + step);
  }, []);

  const searchParams = useSearchParams();
  // TODO 错误处理
  const redirect = searchParams.get("redirect");

  const handleTicket = useCallback((ticket: string) => {
    setResetTicket(ticket);
  }, []);
  const handleUsername = useCallback((username: string) => {
    setUsername(username);
  }, []);
  const providerValue = {
    redirect,
    username: username,
    resetTicket: resetTicket,
    currentStep: step,
    handleStep: handleStep,
    handleTicket: handleTicket,
    handleUsername: handleUsername,
  };
  return (
    <>
      <div className={"pageTitle"}>{"<ResetPassword>"}</div>
      <div className={"globalContainer"}>
        <ResetContext.Provider value={providerValue}>
          {step === 1 ? <ResetStep1 /> : <></>}
          {step === 2 ? <ResetStep2 /> : <></>}
          {step === 3 ? <ResetStep3 /> : <></>}
          {step === 4 ? <ResetStep4 /> : <></>}
        </ResetContext.Provider>
      </div>
    </>
  );
};

export default Regist;
