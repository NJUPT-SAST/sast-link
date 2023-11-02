"use client";

import { Form } from "@/components/form";
import { useContext, useRef, useState, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/redux";
import { addLoginTicket } from "@/redux/features/login";
import { veriLoginAccount } from "@/lib/apis/global";
import { Button } from "@/components/button";
import { InputWithLabel } from "@/components/input/inputWithLabel";
import { handleError } from "@/lib/func";
import Link from "next/link";
import { Anchor } from "@/components/anchor";
import { OtherLoginList } from "@/components/list/otherLoginList";
import { GithubIcon, QqIcon, MsIcon } from "@/components/icon";
import { useRouter } from "next/navigation";

import styles from "./page.module.scss";
import classNames from "classnames";

const list = [
  {
    target: "",
    describe: "Github",
    icon: <GithubIcon />,
  },
  {
    target: "",
    describe: "QQ",
    icon: <QqIcon />,
  },
  {
    target: "",
    describe: "Microsoft",
    icon: <MsIcon />,
  },
];

const LoginStep1 = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { redirect } = useAppSelector((state) => state.loginMessage);
  const [error, setError] = useState<
    { error: false } | { error: true; errMsg: string }
  >({ error: false });

  const veridate = useCallback((value: string) => {
    if (value === "") {
      return "用户名不可为空";
    }
    return false;
  }, []);

  /**
   * 输入账号，点击登录后进入判断，验证账号存在性，存储返回信息
   */
  return (
    <>
      <Form
        className={[`${styles.nameForm}`]}
        names={["username"]}
        onSubmit={(args) => {
          setLoading(true);
          const username = args.username as string;
          veriLoginAccount(username)
            .then((res) => {
              console.log("res", res);
              if (res.data.Success) {
                const ticket = res.data.Data.loginTicket;
                console.log(ticket);
                dispatch(addLoginTicket(ticket));
                router.replace("/login/2");
                return;
              }
              setError({ error: true, errMsg: res.data.ErrMsg });
            })
            .catch()
            .finally(() => {
              setLoading(false);
            });
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
          <div className={styles.resetPwdContainer}>
            <Link href={"/reset"} className={styles.resetPwd}>
              忘记密码
            </Link>
          </div>
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
          className={classNames(styles.formButton)}
          type={"submit"}
        >
          下一步
        </Button>
      </Form>
      {
        // TODO 第三方认证登录
      }
      <Anchor href="./" className={classNames(styles.anchor)}>
        SAST 飞书登录
      </Anchor>
      <OtherLoginList list={list} />
      <div className={`${styles.toRegist}`}>
        没有账号？
        <Link href={`/regist${!!redirect ? `?redirect=${redirect}` : ""}`}>
          注册
        </Link>
      </div>
    </>
  );
};

export { LoginStep1 };
