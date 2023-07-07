"use client";

import { Form } from "@/components/form";
import { useContext, useRef, useState, useCallback } from "react";
import { LoginContext } from "./page";
import { veriAccount } from "@/lib/apis/verify";
import { Button } from "@/components/button";
import { InputWithLabel } from "@/components/input/inputWithLabel";
import { handleError } from "@/lib/func";
import Link from "next/link";
import { Anchor } from "@/components/anchor";
import { OtherLoginList } from "@/components/list/otherLoginList";
import { GithubIcon, QqIcon, MsIcon } from "@/components/icon";
import { login } from "@/redux/features/userProfile";

import styles from "./page.module.scss";

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
          handleStep(1)
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
      <Anchor href="a" className={[styles.anchor]}>
        SAST 飞书登录
      </Anchor>
      <OtherLoginList list={list} />
      <div className={`${styles.toRegist}`}>
        没有账号？<Link href={"/regist"}>注册</Link>
      </div>
    </>
  );
};

export { LoginStep1 };
