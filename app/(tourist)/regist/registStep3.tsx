"use client";

import { Form } from "@/components/form";
import { NextButton } from "@/components/button";
import { useContext, useCallback, useRef, useState } from "react";
import { InputWithLabel } from "@/components/input/inputWithLabel";
import { handleError } from "@/lib/func";
import { Footer } from "@/components/footer";
import { RegistContext } from "./page";
import styles from "./page.module.scss";

const RegistStep3 = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const passInputRef = useRef<HTMLInputElement>(null);
  const veriInputRef = useRef<HTMLInputElement>(null);
  const { handleStep } = useContext(RegistContext);
  const [passError, setPassError] = useState<
    { error: false } | { error: true; errMsg: string }
  >({ error: false });

  const [veriError, setVeriError] = useState<
    { error: false } | { error: true; errMsg: string }
  >({ error: false });

  const veridate = useCallback((value: string) => {
    if (value === "") return "密码不可为空";
    return false;
  }, []);

  const veridate2 = useCallback((value: string) => {
    if (value !== passInputRef.current!.value) {
      return "密码不一致";
    }
    return false;
  }, []);

  return (
    <>
      <Form
        className={[`${styles.form}`]}
        onSubmit={(args) => {
          handleStep(1);
          console.log(args);
        }}
        names={["password", "veriPassword"]}
      >
        <div className={`${styles.inputDiv} ${styles.passInput}`}>
          <InputWithLabel
            type="password"
            withBlur={() =>
              setVeriError(handleError(veridate2(veriInputRef.current!.value)))
            }
            setErrorState={setPassError}
            veridate={veridate}
            ref={passInputRef}
            palceholder="密码"
            label="密码"
            name="password"
            error={passError}
          />
          <InputWithLabel
            type="password"
            setErrorState={setVeriError}
            veridate={veridate2}
            ref={veriInputRef}
            palceholder="确认密码"
            label="确认密码"
            name="veriPassword"
            error={veriError}
          />
        </div>
        <Footer>
          <NextButton
            loading={loading}
            onClick={(e) => {
              const passCheck = veridate(passInputRef.current!.value);
              const veriCheck = veridate2(veriInputRef.current!.value);
              if (passCheck || veriCheck) {
                setPassError(handleError(passCheck));
                setVeriError(handleError(veriCheck));
                e.preventDefault();
                return;
              }
            }}
            type="submit"
          />
        </Footer>
      </Form>
    </>
  );
};

export { RegistStep3 };
