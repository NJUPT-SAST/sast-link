"use client";

import React, { useCallback, useState } from "react";
import styles from "./page.module.scss";
import {RegistStep1} from "./registStep1";
import { RegistStep2 } from "./registStep2";
import { RegistStep3 } from "./registStep3";
import { RegistStep4 } from "./registStep4";

interface RegistContextProps {
  currentStep: number;
  handleStep: (step: -1 | 1) => void;
}

export const RegistContext = React.createContext<RegistContextProps>({
  currentStep: 1,
  handleStep: (step: 1 | -1) => void 0,
});

const Regist = () => {
  const [step, setStep] = useState<number>(1);
  const handleStep = useCallback((step: -1 | 1) => {
    setStep((pre) => pre + step);
  }, []);

  const providerValue = {
    currentStep: step,
    handleStep: handleStep,
  };
  return (
    <>
      <div className={"pageTitle"}>{"<Register>"}</div>
      <div className={"globalContainer"}>
        <RegistContext.Provider value={providerValue}>
          { step === 1 ? <RegistStep1 /> : <></> }
          { step === 2 ? <RegistStep2 /> : <></> }
          { step === 3 ? <RegistStep3 /> : <></> }
          { step === 4 ? <RegistStep4 /> : <></> }
        </RegistContext.Provider>
      </div>
    </>
  );
};

export default Regist;
