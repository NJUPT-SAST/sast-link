"use client"

import { useState, useRef, useCallback, useContext } from "react";
import { userLogin } from "@/lib/apis/user";
import { Form } from "@/components/form";
import { Button } from "@/components/button";
import { InputWithLabel } from "@/components/input/inputWithLabel";
import { Footer } from "@/components/footer";
import { handleError } from "@/lib/func";

import styles from "./page.module.scss";
import { LoginContext } from "../page";

const LoginStep2 = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { handleTitle, handleStep } = useContext(LoginContext);
  const [error, setError] = useState<
    { error: false } | { error: true; errMsg: string }
  >({ error: false });
  const veridate = useCallback((value: string) => {
    if (value === "") {
      return "密码不可为空";
    }
    return false;
  }, []);

  return (
    <>
      <Form
        className={[`${styles.passForm} ${styles.input}`]}
        names={["password"]}
        onSubmit={(args) => {
          setLoading(true);
          if (typeof args.password === "string") {
            const password = args.password;
            userLogin(password)
              .then(
                (res) => {
                  console.log(res);
                },
                (err) => {}
              )
              .finally(() => {
                setLoading(false);
              });
          }
        }}
      >
        <div className={`${styles.inputDiv}`}>
          <InputWithLabel
            setErrorState={setError}
            veridate={veridate}
            label="密码"
            palceholder="密码"
            error={error}
            ref={inputRef}
            name="password"
          />
        </div>
        <Footer>
          <Button
            loading={loading}
            onClick={(e) => {
              const check = veridate(inputRef.current!.value);
              if (check) {
                setError(handleError(check));
                e.preventDefault();
                return;
              }
            }}
            type="submit"
          >
            登录 SAST Link
          </Button>
          <Button onClick={() => handleStep(-1)} type="button" white>
            使用其他账号
          </Button>
        </Footer>
      </Form>
    </>
  );
};

export default LoginStep2