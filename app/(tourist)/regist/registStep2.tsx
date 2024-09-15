"use client";

import { Form } from "@/components/form";
import { NextButton } from "@/components/button";
import { useCallback, useContext, useRef, useState } from "react";
import { InputWithLabel } from "@/components/input/inputWithLabel";
import { handleError } from "@/lib/func";

import { VeriCode } from "@/components/veriCode";
import { Footer } from "@/components/footer";
import { veriCaptcha } from "@/lib/apis/global";
import { RegistContext } from "@/lib/context";
import styles from "./page.module.scss";
import classNames from "classnames";

const RegistStep2 = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<
    { error: false } | { error: true; errMsg: string }
  >({ error: false });

  const { username, registTicket = "", handleStep } = useContext(RegistContext);

  const veridate = useCallback((value: string) => {
    if (value === "") {
      return "验证码不可为空";
    }
    return false;
  }, []);

  return (
    <>
      <Form
        className={[`${styles.form}`]}
        onSubmit={(args) => {
          setLoading(true);
          const captcha = args.veriCode as string;
          console.log(captcha, registTicket);
          veriCaptcha(registTicket, captcha)
            .then((res) => {
              if (res.data.success) handleStep(1);
              else setError(handleError(res.data.err_msg));
            })
            .catch()
            .finally(() => {
              setLoading(false);
            });
        }}
        names={["veriCode"]}
      >
        <div className={`${styles.inputDiv} ${styles.veriCodeInput}`}>
          <div className={styles.defaultHead}>{"S- "}</div>
          <InputWithLabel
            className={classNames(styles.vericodeInput)}
            setErrorState={setError}
            veridate={veridate}
            ref={inputRef}
            error={error}
            name="veriCode"
            label="验证码"
            palceholder="验证码"
            maxLength={5}
          >
            <VeriCode />
          </InputWithLabel>
          <div className={styles.descript}>
            已经往 {username} 发送一封带有验证码的邮件，请注意查收！
          </div>
        </div>

        <Footer>
          <NextButton
            loading={loading}
            onClick={(e) => {
              if (veridate(inputRef.current!.value)) {
                setError(handleError(veridate(inputRef.current!.value)));
                e.preventDefault();
              }
            }}
            type="submit"
          />
        </Footer>
      </Form>
    </>
  );
};

export { RegistStep2 };
