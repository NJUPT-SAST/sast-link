"use client";

import { useState, useRef, useCallback, useContext } from "react";
import { getUserInfo, userLogin } from "@/lib/apis/user";
import { Form } from "@/components/form";
import { Button } from "@/components/button";
import { InputWithLabel } from "@/components/input/inputWithLabel";
import { Footer } from "@/components/footer";
import { handleError } from "@/lib/func";
import { LoginContext } from "@/lib/context";
import { useRouter } from "next/navigation";
import { login } from "@/redux/features/userProfile";
import { addAccount } from "@/redux/features/userList";
import { useSWRConfig } from "swr";
import { useAppDispatch } from "@/redux";
import Link from "next/link";

import styles from "./page.module.scss";
import { Success } from "@/components/message/messageItem/icons";

const LoginStep2 = () => {
  const { mutate } = useSWRConfig();
  const tokenRef = useRef<string>("");
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { loginTicket = "", handleStep, redirect } = useContext(LoginContext);
  const [error, setError] = useState<
    { error: false } | { error: true; errMsg: string }
  >({ error: false });
  const veridate = useCallback((value: string) => {
    if (value === "") {
      return "密码不可为空";
    }
    return false;
  }, []);

  /**
   * 点击登陆后，存储返回信息，
   * 如必要，根据返回信息获取用户信息，并存储。
   * 并根据 searchParams 判断登录后重定向的位置
   */
  return (
    <>
      <Form
        className={[`${styles.passForm} ${styles.input}`]}
        names={["password"]}
        onSubmit={(args) => {
          setLoading(true);
          if (typeof args.password === "string") {
            const password = args.password;
            // TODO 当从授权界面跳转时 不执行覆盖当前用户的登录操作
            userLogin(password, loginTicket)
              .then((res) => {
                if (res.data.Success) {
                  const token = res.data.Data.loginToken;
                  console.log(token);

                  localStorage.setItem("Token", JSON.stringify(token));
                  tokenRef.current = token;
                  return getUserInfo().then((res) => {
                    if (res.data.Success) {
                      const data = res.data.Data;
                      dispatch(
                        addAccount({
                          nickName: "ming",
                          email: data.email,
                          Token: tokenRef.current,
                        })
                      );
                      dispatch(login({ username: "ming", email: data.email }));
                      if (redirect) {
                        mutate("infoUpdate");
                        router.replace(redirect);
                      } else router.replace("/home");
                      return;
                    }
                    setError(handleError(res.data.ErrMsg));
                  });
                }
                setError(handleError(res.data.ErrMsg));
              })
              .catch()
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
            type="password"
            palceholder="密码"
            error={error}
            ref={inputRef}
            name="password"
          />
          <div className={styles.resetPwdContainer}>
            <Link href={"/reset"} className={styles.resetPwd}>
              忘记密码
            </Link>
          </div>
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
            {redirect ? "登录并前往授权" : "登录 SAST Link"}
          </Button>
          <Button onClick={() => handleStep(-1)} type="button" white>
            使用其他账号
          </Button>
        </Footer>
      </Form>
    </>
  );
};

export { LoginStep2 };
