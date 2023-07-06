"use client";

import { Form } from "@/components/form";
import { useContext, useRef, useState, useCallback } from "react";
import { LoginContext } from "../page";
import { veriAccount } from "@/lib/apis/verify";
import { Button } from "@/components/button";
import { InputWithLabel } from "@/components/input/inputWithLabel";
import { handleError } from "@/lib/func";

import styles from "./page.module.scss";
import { login } from "@/redux/features/userProfile";

const LoginStep1 = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { handleTitle, handleStep } = useContext(LoginContext);
  const [error, setError] = useState<
    { error: false } | { error: true; errMsg: string }
  >({ error: false });

  const veridate = useCallback((value: string) => {
    if (value === "") {
      return "用户名不可为空";
    }
    return false;
  }, []);

  return (
    <>
      <Form
        className={[`${styles.nameForm}`]}
        names={["username"]}
        onSubmit={(args) => {
          setLoading(true);
          if (typeof args.username === "string") {
            const username = args.username;
            veriAccount(username, 1)
              .then(
                (res) => {
                  handleStep(1);
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
            ref={inputRef}
            label="账户"
            name="username"
            error={error}
            palceholder="学号或邮箱"
          />
        </div>

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
          className={[styles.formButton]}
          type={"submit"}
        >
          登录
        </Button>
      </Form>
    </>
  );
};

export default LoginStep1;
