"use client";

import React, { useCallback, useState } from "react";
import { ResetStep1 } from "./resetStep1";
import { ResetStep2 } from "./resetStep2";
import { ResetStep3 } from "./resetStep3";
import { ResetStep4 } from "./resetStep4";
import { useSearchParams } from "next/navigation";
import { ResetContext } from "@/lib/context";
import PageTransition from "@/components/pageTransition";

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
          {step === 1 ? (
            <PageTransition>
              <ResetStep1 />
            </PageTransition>
          ) : (
            <></>
          )}
          {step === 2 ? (
            <PageTransition>
              <ResetStep2 />
            </PageTransition>
          ) : (
            <></>
          )}
          {step === 3 ? (
            <PageTransition>
              <ResetStep3 />
            </PageTransition>
          ) : (
            <></>
          )}
          {step === 4 ? (
            <PageTransition>
              <ResetStep4 />
            </PageTransition>
          ) : (
            <></>
          )}
        </ResetContext.Provider>
      </div>
    </>
  );
};

export default Regist;
