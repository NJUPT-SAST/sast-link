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

import { useAppDispatch } from "@/redux";

import styles from "./page.module.scss";

const LoginStep2 = () => {
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
                // console.log(res);
                const token = res.data.Data.token;
                console.log(token);

                localStorage.setItem("Token", JSON.stringify(token));
                tokenRef.current = token;
                return getUserInfo();
              })
              .then((res) => {
                // TODO 根据返回值设置账户信息
                const data = res.data.Data;
                dispatch(
                  addAccount({
                    nickName: "ming",
                    email: data.email,
                    Token: tokenRef.current,
                  })
                );
                dispatch(login({ username: "ming", email: data.email }));
                // 若存在重定向链接，则跳转至重定向链接，不存在则跳转至 /home
                redirect? null: router.push("/home");
              })
              .catch((err) => {
                setError({ error: true, errMsg: err.response.data.ErrMsg });
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
