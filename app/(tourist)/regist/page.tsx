"use client";

import React, { useCallback, useState } from "react";
import styles from "./page.module.scss";

interface RegistContextProps {
  currentStep: number;
  handleStep: (step: -1 | 1) => void;
}

export const RegistContext = React.createContext<RegistContextProps>({
  currentStep: 1,
  handleStep: (step: 1 | -1) => void 0,
});

const Regist = () => {
  const [step, setStep] = useState<number>(0);
  const handleStep = useCallback((step: -1 | 1) => {
    setStep((pre) => pre + step);
  }, []);

  const providerValue = {
    currentStep: step,
    handleStep: handleStep,
  };
  return (
    <>
      <div className={styles.title}>{"<Register>"}</div>
      <div className={styles.container}>
        <RegistContext.Provider value={providerValue}>
          {/* {step === 1 ? firstStep : secondStep} */}
        </RegistContext.Provider>
      </div>
    </>
  );
};

export default Regist;
