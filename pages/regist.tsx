import { Layout } from "@/components/Layout";
import { Form } from "@/components/form";
import { Input } from "@/components/input";
import styles from "@/styles/Regist.module.scss";
import { Button, NextButton } from "@/components/button";
import { useCallback, useState } from "react";
import { A } from "@/components/a";
import BackLayout from "@/components/Layout/BackLayout";

const Regist = () => {
  const [step, setStep] = useState<number>(1);
  const nextStep = useCallback(() => {
    setStep((pre) => pre + 1);
  }, []);

  return (
    <>
      <BackLayout />
      <Layout title="<Register>">
        {step === 1 && <RegistStep1 handleStep={nextStep} />}
        {step === 2 && <RegistStep2 handleStep={nextStep} />}
        {step === 3 && <RegistStep3 handleStep={nextStep} />}
        {step === 4 && <RegistStep4 />}
      </Layout>
    </>
  );
};

export default Regist;

const RegistStep1 = (props: { handleStep: () => void }) => {
  const { handleStep } = props;
  return (
    <>
      <Form
        className={[`${styles.form}`]}
        onSubmit={(args) => {
          handleStep();
          console.log(args);
        }}
        names={["mail"]}
      >
        <div className={`${styles.inputDiv} ${styles.mailInput}`}>
          <Input placeholder="学号" name="mail" />
          <span>@njupt.edu.cn</span>
          <div className={styles.descript}>
            确认后，我们将会往你的邮箱发送一封验证邮件，请在验证后继续。
          </div>
        </div>

        <div className={styles.footer}>
          <NextButton type="submit" />
        </div>
      </Form>
    </>
  );
};

const RegistStep2 = (props: { handleStep: () => void }) => {
  const { handleStep } = props;
  return (
    <>
      <Form
        className={[`${styles.form}`]}
        onSubmit={(args) => {
          handleStep();
          console.log(args);
        }}
        names={["veriCode"]}
      >
        <div className={`${styles.inputDiv} ${styles.veriCodeInput}`}>
          <Input placeholder="验证码" name="veriCode" />
          <div className={styles.descript}>
            已经往 B21000000@njupt.edu.cn 发送一封带有验证码的邮件，请注意查收！
          </div>
        </div>

        <div className={styles.footer}>
          <NextButton type="submit" />
        </div>
      </Form>
    </>
  );
};

const RegistStep3 = (props: { handleStep: () => void }) => {
  const { handleStep } = props;
  return (
    <>
      <Form
        className={[`${styles.form}`]}
        onSubmit={(args) => {
          handleStep();
          console.log(args);
        }}
        names={["password", "veriPassword"]}
      >
        <div className={`${styles.inputDiv} ${styles.passInput}`}>
          <Input placeholder="密码" name="password" />
          <Input placeholder="确认密码" name="veriPassword" />
        </div>

        <div className={styles.footer}>
          <NextButton type="submit" />
        </div>
      </Form>
    </>
  );
};

const RegistStep4 = () => {
  return (
    <>
      <div className={`${styles.complete}`}>
        <div className={`${styles.success}`}>
          <Input placeholder="密码" name="password" />
        </div>
        <div className={styles.footer}>
          <NextButton />
          {/* <A href="/login">返回登录</A> */}
        </div>
      </div>
    </>
  );
};
