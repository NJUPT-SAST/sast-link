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
import { useCallback, useState } from "react";
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

const Step2 = (props: { handleStep: () => void }) => {
  const { handleStep } = props;
  return (
    <>
      <Form
        className={[`${styles.passForm}`]}
        names={["password"]}
        onSubmit={(args) => {
          console.log(args);
        }}
      >
        <div className={`${styles.passInput}`}>
          <Input name={"password"} placeholder={"密码"} />
        </div>
        <div className={styles.footer}>
          <Button type="submit">登录 SAST Link</Button>
          <Button onClick={handleStep} type="button" white>
            使用其他账号
          </Button>
        </div>
      </Form>
    </>
  );
};

const Step1 = (props: { handleStep: () => void }) => {
  const { handleStep } = props;
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
        <Input
          className={[styles.input]}
          name={`username`}
          placeholder={`用户名或邮箱`}
        />
        <Button className={[styles.formButton]} type={"submit"}>
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
