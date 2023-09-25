"use client";

import { useRef, useState, useCallback, useContext } from "react";
import { Form } from "@/components/form";
import { sendMail, veriResetAccount } from "@/lib/apis/global";
import { Footer } from "@/components/footer";
import { NextButton } from "@/components/button";
import { InputWithLabel } from "@/components/input/inputWithLabel";
import { handleError } from "@/lib/func";
import { ResetContext } from "@/lib/context";
import styles from "./page.module.scss";

const ResetStep1 = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<
    { error: false } | { error: true; errMsg: string }
  >({ error: false });

  const veridate = useCallback((value: string) => {
    if (value === "") return "学号不可为空";
    return false;
  }, []);

  const { handleStep, handleTicket, handleUsername } =
    useContext(ResetContext);

  return (
    <>
      <Form
        className={[`${styles.form}`]}
        onSubmit={(args) => {
          setLoading(true);
          if (typeof args.mail === "string") {
            const mail = args.mail + "@njupt.edu.cn";
            handleUsername(mail);
            veriResetAccount(mail)
              .then((res) => {
                let ticket = "";
                if (res.data.Success) {
                  ticket = res.data.Data.resetPwdTicket;
                  handleTicket(ticket);
                  return sendMail(ticket, "reset").then((res) => {
                    if (res.data.Success) handleStep(1);
                    else setError(handleError(res.data.ErrMsg));
                  });
                }
                setError(handleError(res.data.ErrMsg));
              })
              .catch((err) => console.log(err))
              .finally(() => {
                setLoading(false);
              });
            return;
          }
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
            您正在进行密码重置，请输入您的学号。点击下一步后，我们将会向你的邮箱发送一封验证邮件。
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

export { ResetStep1 };
