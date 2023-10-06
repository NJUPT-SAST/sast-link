"use client";

import React, { useCallback, useState } from "react";
import { RegistStep1 } from "./registStep1";
import { RegistStep2 } from "./registStep2";
import { RegistStep3 } from "./registStep3";
import { RegistStep4 } from "./registStep4";
import { useSearchParams } from "next/navigation";
import { RegistContext } from "@/lib/context";

const Regist = () => {
  const [registTicket, setRegistTicket] = useState<string | undefined>();
  const [username, setUsername] = useState<string | undefined>();
  const [step, setStep] = useState<number>(1);
  const handleStep = useCallback((step: -1 | 1) => {
    setStep((pre) => pre + step);
  }, []);

  const searchParams = useSearchParams();
  // TODO 错误处理
  const redirect = searchParams.get("redirect");
  // const redirect =
  //   redirectParams?.split("?")[0] +
  //   "?" +
  //   JSON.parse(redirectParams?.split("?")[1] ?? "[]").join("&");

  const handleTicket = useCallback((ticket: string) => {
    setRegistTicket(ticket);
  }, []);
  const handleUsername = useCallback((username: string) => {
    setUsername(username);
  }, []);
  const providerValue = {
    redirect,
    username: username,
    registTicket: registTicket,
    currentStep: step,
    handleStep: handleStep,
    handleTicket: handleTicket,
    handleUsername: handleUsername,
  };
  return (
    <>
      <div className={"pageTitle"}>{"<Register>"}</div>
      <div className={"globalContainer"}>
        <RegistContext.Provider value={providerValue}>
          {step === 1 ? <RegistStep1 /> : <></>}
          {step === 2 ? <RegistStep2 /> : <></>}
          {step === 3 ? <RegistStep3 /> : <></>}
          {step === 4 ? <RegistStep4 /> : <></>}
        </RegistContext.Provider>
      </div>
    </>
  );
};

export default Regist;
