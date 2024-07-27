"use client";

import { useState, useRef, useCallback, useContext, useEffect } from "react";
import { getUserInfo, userLogin } from "@/lib/apis/user";
import { Form } from "@/components/form";
import { Button } from "@/components/button";
import { InputWithLabel } from "@/components/input/inputWithLabel";
import { Footer } from "@/components/footer";
import { handleError } from "@/lib/func";
import { useRouter, useSearchParams } from "next/navigation";
import { login } from "@/redux/features/userProfile";
import { addAccount } from "@/redux/features/userList";
import { useAppDispatch, useAppSelector } from "@/redux";
import Link from "next/link";
import styles from "../page.module.scss";
import PageTransition from "@/components/pageTransition";

const LoginStep2 = () => {
  const tokenRef = useRef<string>("");
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { loginTicket } = useAppSelector((state) => state.loginMessage);
  // const redirect_uri = useAppSelector((state) => state.loginMessage.redirect);
  const urlParams = useSearchParams();
  const redirect_uri = atob(urlParams.get("redirect") ?? "");
  const [error, setError] = useState<
    { error: false } | { error: true; errMsg: string }
  >({ error: false });
  const veridate = useCallback((value: string) => {
    if (value === "") {
      return "密码不可为空";
    }
    return false;
  }, []);

  useEffect(() => {
    if (!!!loginTicket) {
      router.replace("/login");
    }
  }, [router, loginTicket]);
  /**
   * 点击登陆后，存储返回信息，
   * 如必要，根据返回信息获取用户信息，并存储。
   * 并根据 searchParams 判断登录后重定向的位置
   */

  return (
    <>
      <PageTransition className={styles.formLayout}>
        <Form
          className={[`${styles.passForm} ${styles.input}`]}
          names={["password"]}
          onSubmit={(args) => {
            setLoading(true);
            if (typeof args.password === "string") {
              const password = args.password;
              userLogin(
                password,
                loginTicket ?? "",
                urlParams.get("oauthTicket"),
              )
                .then((res) => {
                  if (res.data.Success) {
                    const token = res.data.Data.loginToken;

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
                            userId: data.userId,
                          }),
                        );
                        //dispatch(login({ username: "ming", email: data.email }));
                        if (urlParams.get("redirect") !== null) {
                          router.push(redirect_uri);
                        } else {
                          console.log("go home");
                          router.push("/home");
                        }
                        return;
                      }

                      setError(handleError(res.data.ErrMsg));
                    });
                  }
                  //如果loginTicket过期就重定向到登陆页面
                  if (res.data.ErrCode === 20007) {
                    router.replace("/login");
                  }
                  setError(handleError(res.data.ErrMsg));
                })
                .catch((err) => {
                  //如果密码验证失败,会返回401错误码
                  if (err.response.status === 401) {
                    setError({
                      error: true,
                      errMsg: "密码错误，请重新输入密码",
                    });
                  }
                })
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
              {redirect_uri !== "" ? "登录并前往授权" : "登录 SAST Link"}
            </Button>
            <Button onClick={() => router.replace("../")} type="button" white>
              使用其他账号
            </Button>
          </Footer>
        </Form>
      </PageTransition>
    </>
  );
};

export default LoginStep2;
