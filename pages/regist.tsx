import { Layout } from "@/components/Layout";
import { Form } from "@/components/form";
import styles from "@/styles/Regist.module.scss";
import { NextButton } from "@/components/button";
import { useCallback, useRef, useState } from "react";
import { A } from "@/components/a";
import { Player } from "@lottiefiles/react-lottie-player";
import { InputWithLabel } from "@/components/input/inputWithLabel";
import { handleError } from "@/components/function";
import BackLayout from "@/components/Layout/BackLayout";
import { CenterArrow } from "@/components/icon/ArrowIcon";
import classNames from "classnames";
import { VeriCode } from "@/components/veriCode";
import { Footer } from "@/components/footer";

const Regist = () => {
  const [step, setStep] = useState<number>(1);
  const nextStep = useCallback(() => {
    setStep((pre) => pre + 1);
  }, []);

  return (
    <>
      <BackLayout type="blue" />
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
  const [loading, setLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<
    { error: false } | { error: true; errMsg: string }
  >({ error: false });

  const veridate = useCallback((value: string) => {
    if (value === "") return "学号不可为空";
    return false;
  }, []);

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
          <InputWithLabel
            setErrorState={setError}
            veridate={veridate}
            label="学生邮箱"
            error={error}
            ref={inputRef}
            maxLength={9}
            name="mail"
            palceholder="学号"
          >
            <span>@njupt.edu.cn</span>
          </InputWithLabel>
          <div className={styles.descript}>
            确认后，我们将会往你的邮箱发送一封验证邮件，请在验证后继续。
          </div>
        </div>

        <Footer>
          <NextButton
            loading={loading}
            onClick={(e) => {
              if (veridate(inputRef.current!.value)) {
                setError(handleError(veridate(inputRef.current!.value)));
                e.preventDefault();
              }
            }}
            type="submit"
          />
        </Footer>
      </Form>
    </>
  );
};

const RegistStep2 = (props: { handleStep: () => void }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<
    { error: false } | { error: true; errMsg: string }
  >({ error: false });

  const { handleStep } = props;

  const veridate = useCallback((value: string) => {
    if (value === "") {
      return "验证码不可为空";
    }
    return false;
  }, []);

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
          <InputWithLabel
            setErrorState={setError}
            veridate={veridate}
            ref={inputRef}
            error={error}
            name="veriCode"
            label="验证码"
            palceholder="验证码"
          >
            <VeriCode />
          </InputWithLabel>
          <div className={styles.descript}>
            已经往 B21000000@njupt.edu.cn 发送一封带有验证码的邮件，请注意查收！
          </div>
        </div>

        <Footer>
          <NextButton
            loading={loading}
            onClick={(e) => {
              if (veridate(inputRef.current!.value)) {
                setError(handleError(veridate(inputRef.current!.value)));
                e.preventDefault();
              }
            }}
            type="submit"
          />
        </Footer>
      </Form>
    </>
  );
};

const RegistStep3 = (props: { handleStep: () => void }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const passInputRef = useRef<HTMLInputElement>(null);
  const veriInputRef = useRef<HTMLInputElement>(null);
  const [passError, setPassError] = useState<
    { error: false } | { error: true; errMsg: string }
  >({ error: false });

  const [veriError, setVeriError] = useState<
    { error: false } | { error: true; errMsg: string }
  >({ error: false });

  const veridate = useCallback((value: string) => {
    if (value === "") return "密码不可为空";
    return false;
  }, []);

  const veridate2 = useCallback((value: string) => {
    if (value !== passInputRef.current!.value) {
      return "密码不一致";
    }
    return false;
  }, []);

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
          <InputWithLabel
            type="password"
            withBlur={() =>
              setVeriError(handleError(veridate2(veriInputRef.current!.value)))
            }
            setErrorState={setPassError}
            veridate={veridate}
            ref={passInputRef}
            palceholder="密码"
            label="密码"
            name="password"
            error={passError}
          />
          <InputWithLabel
            type="password"
            setErrorState={setVeriError}
            veridate={veridate2}
            ref={veriInputRef}
            palceholder="确认密码"
            label="确认密码"
            name="veriPassword"
            error={veriError}
          />
        </div>
        <Footer>
          <NextButton
            loading={loading}
            onClick={(e) => {
              const passCheck = veridate(passInputRef.current!.value);
              const veriCheck = veridate2(veriInputRef.current!.value);
              if (passCheck || veriCheck) {
                setPassError(handleError(passCheck));
                setVeriError(handleError(veriCheck));
                e.preventDefault();
                return;
              }
            }}
            type="submit"
          />
        </Footer>
      </Form>
    </>
  );
};

const RegistStep4 = () => {
  return (
    <>
      <div className={`${styles.complete}`}>
        <div className={`${styles.success}`}>
          <Player
            autoplay={true}
            loop={false}
            src="https://assets5.lottiefiles.com/packages/lf20_svaw8skx.json"
            style={{ height: "200px", width: "200px" }}
            keepLastFrame
            renderer="svg"
          />
          <span>注册成功</span>
        </div>
        <Footer>
          <A black href="/login">
            返回登录
            <CenterArrow />
          </A>
        </Footer>
      </div>
    </>
  );
};
