import { Button } from "@/components/button";
import { A } from "@/components/a";
import { GithubIcon, QqIcon, MsIcon } from "@/components/icon";
import classNames from "classnames";
import styles from "@/styles/Login.module.scss";
import { Form } from "@/components/form";
import Link from "next/link";
import { Layout } from "@/components/Layout";
import { useCallback, useRef, useState } from "react";
import BackLayout from "@/components/Layout/BackLayout";
import { InputWithLabel } from "@/components/input/inputWithLabel";
import { Footer } from "@/components/footer";
import { handleError } from "@/components/function";

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
  const [loading, setLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<
    { error: false } | { error: true; errMsg: string }
  >({ error: false });
  const { handleStep } = props;

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
          setTimeout(() => {
            setLoading(false);
            handleStep();
          }, 1000);
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
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<
    { error: false } | { error: true; errMsg: string }
  >({ error: false });
  const { handleStep } = props;
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
          const promise2 = new Promise<{ success: boolean; msg: string }>(
            (resolve, reject) => {
              setTimeout(() => {
                resolve({ success: false, msg: "Hello" });
              }, 1000);
            },
          );
          promise2.then((res) => {
            setLoading(false);
            if (res.success) {
              setError({ error: false });
            } else {
              setError({ error: true, errMsg: res.msg });
            }
          });
          console.log(args);
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
          <Button onClick={handleStep} type="button" white>
            使用其他账号
          </Button>
        </Footer>
      </Form>
    </>
  );
};
