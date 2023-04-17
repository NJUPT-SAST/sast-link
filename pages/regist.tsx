import { Layout } from "@/components/Layout";
import { Form } from "@/components/form";
import { Input } from "@/components/input";
import styles from "@/styles/Regist.module.scss";
import { Button, NextButton } from "@/components/button";
import { useCallback, useEffect, useRef, useState } from "react";
import { A } from "@/components/a";
import { Player } from "@lottiefiles/react-lottie-player";

import BackLayout from "@/components/Layout/BackLayout";
import { CenterArrow } from "@/components/icon/ArrowIcon";
import classNames from "classnames";

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
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<
    { error: false } | { error: true; errMsg: string }
  >({ error: false });

  const mailCheck: (value: string) => boolean = useCallback((value) => {
    if (value === "") {
      setError({ error: true, errMsg: "学号不可为空" });
    } else {
      setError((pre) => (pre.error ? { error: false } : pre));
      return true;
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
        names={["mail"]}
      >
        <div className={`${styles.inputDiv} ${styles.mailInput}`}>
          <div className={`${styles.inputWithMsg}`}>
            <div className={styles.errMsg}>{error.error && error.errMsg}</div>
            <Input
              error={error.error}
              ref={inputRef}
              onBlur={mailCheck}
              maxLength={9}
              placeholder="学号"
              name="mail"
            />
            <span>@njupt.edu.cn</span>
          </div>
          <div className={styles.descript}>
            确认后，我们将会往你的邮箱发送一封验证邮件，请在验证后继续。
          </div>
        </div>

        <div className={styles.footer}>
          <NextButton
            onClick={(e) => {
              if (!mailCheck(inputRef.current!.value)) {
                e.preventDefault();
              }
            }}
            type="submit"
          />
        </div>
      </Form>
    </>
  );
};

const RegistStep2 = (props: { handleStep: () => void }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<
    { error: false } | { error: true; errMsg: string }
  >({ error: false });
  const [clickAble, setClickAble] = useState<boolean>(false);
  const [count, setCount] = useState<number>(60);
  const codeCheck: (value: string) => boolean = useCallback((value) => {
    if (value.length === 0) {
      setError({ error: true, errMsg: "验证码不可为空" });
    } else {
      setError((pre) => (pre.error ? { error: false } : pre));
      return true;
    }
    return false;
  }, []);

  useEffect(() => {
    let intervalId: NodeJS.Timer;
    if (clickAble === false) {
      intervalId = setInterval(() => {
        setCount((pre) => {
          if (pre <= 0) {
            setClickAble(true);
            clearInterval(intervalId);
            return 60;
          }
          return pre - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [clickAble]);

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
          <div className={`${styles.inputWithMsg}`}>
            <div className={styles.errMsg}>{error.error && error.errMsg}</div>
            <Input
              error={error.error}
              onBlur={codeCheck}
              ref={inputRef}
              label="vericode"
              placeholder="验证码"
              name="veriCode"
            />
            <span
              aria-disabled={clickAble}
              onClick={(e) => {
                setClickAble(false);
                console.log(123)
                e.preventDefault();
              }}
              className={`${classNames({
                [styles.clickAble]: clickAble,
              })}`}
            >
              {clickAble ? "" : `${count}s 后`}重新发送
            </span>
          </div>
          <div className={styles.descript}>
            已经往 B21000000@njupt.edu.cn 发送一封带有验证码的邮件，请注意查收！
          </div>
        </div>

        <div className={styles.footer}>
          <NextButton
            onClick={(e) => {
              if (!codeCheck(inputRef.current!.value)) {
                e.preventDefault();
              }
            }}
            type="submit"
          />
        </div>
      </Form>
    </>
  );
};

const RegistStep3 = (props: { handleStep: () => void }) => {
  const passInputRef = useRef<HTMLInputElement>(null);
  const veriInputRef = useRef<HTMLInputElement>(null);
  const [passError, setPassError] = useState<
    { error: false } | { error: true; errMsg: string }
  >({ error: false });

  const [veriError, setVeriError] = useState<
    { error: false } | { error: true; errMsg: string }
  >({ error: false });

  const passCheck: (value: string) => boolean = useCallback((value) => {
    if (value === "") {
      setPassError({ error: true, errMsg: "密码不可为空！" });
    } else {
      setPassError((pre) => (pre.error ? { error: false } : pre));
      return true;
    }
    return false;
  }, []);

  const veriCheck: (value: string) => boolean = useCallback((value) => {
    if (value !== passInputRef.current!.value) {
      setVeriError({ error: true, errMsg: "密码不一致！" });
    } else {
      setVeriError((pre) => (pre.error ? { error: false } : pre));
      return true;
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
          <div className={`${styles.inputWithMsg}`}>
            <div className={styles.errMsg}>
              {passError.error && passError.errMsg}
            </div>
            <Input
              onBlur={passCheck}
              error={passError.error}
              ref={passInputRef}
              label={"password"}
              placeholder="密码"
              name="password"
            />
          </div>
          <div className={`${styles.inputWithMsg}`}>
            <div className={styles.errMsg}>
              {veriError.error && veriError.errMsg}
            </div>
            <Input
              onBlur={veriCheck}
              error={veriError.error}
              ref={veriInputRef}
              placeholder="确认密码"
              label={"veri password"}
              name="veriPassword"
            />
          </div>
        </div>
        <div className={styles.footer}>
          <NextButton
            onClick={(e) => {
              if (
                !passCheck(passInputRef.current!.value) ||
                !veriCheck(veriInputRef.current!.value)
              ) {
                e.preventDefault();
              }
            }}
            type="submit"
          />
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
        <div className={styles.footer}>
          <A black href="/login">
            返回登录
            <CenterArrow />
          </A>
        </div>
      </div>
    </>
  );
};
