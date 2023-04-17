import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { A } from "@/components/a";
import { AccountItem } from "@/components/accountItem";
import { GithubIcon, QqIcon, MsIcon } from "@/components/icon";
import classNames from "classnames";
import styles from "@/styles/Login.module.scss";
import { Form } from "@/components/form";
import Link from "next/link";
import { Layout } from "@/components/Layout";
import { useCallback, useEffect, useRef, useState } from "react";
import BackLayout from "@/components/Layout/BackLayout";

export default function Login() {
  const [step, setStep] = useState<number>(1);

  const nextStep = useCallback(() => {
    setStep((pre) => pre + 1);
  }, []);

  const backStep = useCallback(() => {
    setStep((pre) => pre - 1);
  }, []);

  return (
    <>
      <BackLayout type="orange" />
      <Layout title="Maxtune">
        {step === 1 && <Step1 handleStep={nextStep} />}
        {step === 2 && <Step2 handleStep={backStep} />}
      </Layout>
    </>
  );
}

const Step1 = (props: { handleStep: () => void }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<
    { error: false } | { error: true; errMsg: string }
  >({ error: false });
  const { handleStep } = props;

  const nameCheck: (value: string) => boolean = useCallback((value) => {
    if (value === "") {
      setError({ error: true, errMsg: "用户名不可为空" });
    } else {
      setError((pre) => (pre.error ? { error: false } : pre));
      return true;
    }
    return false;
  }, []);

  return (
    <>
      <Form
        className={[`${styles.nameForm}`]}
        names={["username"]}
        onSubmit={(args) => {
          handleStep();
          console.log(args);
        }}
      >
        <div className={`${styles.inputDiv}`}>
          <div className={styles.errMsg}>{error.error && error.errMsg}</div>
          <Input
            ref={inputRef}
            error={error.error}
            className={[styles.input]}
            onBlur={nameCheck}
            label="username"
            name={`username`}
            placeholder={`用户名或邮箱`}
          />
        </div>

        <Button
          onClick={(e) => {
            if (!nameCheck(inputRef.current!.value)) {
              e.preventDefault();
            }
          }}
          className={[styles.formButton]}
          type={"submit"}
        >
          登录
        </Button>
      </Form>
      <A href="a" className={[styles.anchor]}>
        SAST 飞书登录
      </A>
      <div className={`${styles.icons}`}>
        <a>
          <GithubIcon />
        </a>
        <a>
          <QqIcon />
        </a>
        <a>
          <MsIcon />
        </a>
      </div>
      <div className={`${styles.toRegist}`}>
        没有账号？<Link href={"/regist"}>注册</Link>
      </div>
    </>
  );
};

const Step2 = (props: { handleStep: () => void }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<
    { error: false } | { error: true; errMsg: string }
  >({ error: false });
  const { handleStep } = props;

  const passCheck: (value: string) => boolean = useCallback((value) => {
    if (value === "") {
      setError({ error: true, errMsg: "密码不可为空！" });
    } else {
      setError((pre) => (pre.error ? { error: false } : pre));
      return true;
    }
    return false;
  }, []);

  return (
    <>
      <Form
        className={[`${styles.passForm} ${styles.input}`]}
        names={["password"]}
        onSubmit={(args) => {
          const promise2 = new Promise<{ success: boolean; msg: string }>(
            (resolve, reject) => {
              setTimeout(() => {
                resolve({ success: false, msg: "Hello" });
              });
            },
          );
          promise2.then((res) => {
            if (res.success) {
              setError({ error: false });
              handleStep();
            } else {
              setError({ error: true, errMsg: res.msg });
            }
          });
          console.log(args);
        }}
      >
        <div className={`${styles.inputDiv}`}>
          <div className={styles.errMsg}>{error.error && error.errMsg}</div>
          <Input
            ref={inputRef}
            onBlur={passCheck}
            name={"password"}
            error={error.error}
            label={"password"}
            placeholder={"密码"}
          />
        </div>
        <div className={styles.footer}>
          <Button
            onClick={(e) => {
              if (!passCheck(inputRef.current!.value)) {
                e.preventDefault();
              }
            }}
            type="submit"
          >
            登录 SAST Link
          </Button>
          <Button type="button" white>
            使用其他账号
          </Button>
        </div>
      </Form>
    </>
  );
};
