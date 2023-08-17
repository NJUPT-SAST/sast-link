"use client";

import React, { useCallback, useState } from "react";
import { RegistStep1 } from "./registStep1";
import { RegistStep2 } from "./registStep2";
import { RegistStep3 } from "./registStep3";
import { RegistStep4 } from "./registStep4";
import { useSearchParams } from "next/navigation";

interface RegistContextProps {
  redirect: null | string;
  username?: string;
  registTicket?: string;
  currentStep: number;
  handleStep: (step: -1 | 1) => void;
  handleTicket: (ticket: string) => void;
  handleUsername: (username: string) => void;
}

export const RegistContext = React.createContext<RegistContextProps>({
  redirect: null,
  currentStep: 1,
  handleStep: (step: 1 | -1) => void 0,
  handleTicket: (ticket: string) => void 0,
  handleUsername: (username: string) => void 0,
});

const Regist = () => {
  const [registTicket, setRegistTicket] = useState<string | undefined>();
  const [username, setUsername] = useState<string | undefined>();
  const [step, setStep] = useState<number>(1);
  const handleStep = useCallback((step: -1 | 1) => {
    setStep((pre) => pre + step);
  }, []);

  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  const handleTicket = useCallback((ticket: string) => {
    console.log(ticket);
    setRegistTicket(ticket);
  }, []);
  const handleUsername = useCallback((username: string) => {
    console.log(username);
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
