"use client";

import { useRef, useState, useCallback, useContext } from "react";
import { Form } from "@/components/form";
import { sendMail, veriRegistAccount } from "@/lib/apis/global";
import { Footer } from "@/components/footer";
import { NextButton } from "@/components/button";
import { InputWithLabel } from "@/components/input/inputWithLabel";
import { handleError } from "@/lib/func";
import { RegistContext } from "@/lib/context";
import styles from "./page.module.scss";

const RegistStep1 = () => {
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
    useContext(RegistContext);

  return (
    <>
      <Form
        className={[`${styles.form}`]}
        onSubmit={(args) => {
          setLoading(true);
          if (typeof args.mail === "string") {
            const mail = args.mail + "@njupt.edu.cn";
            handleUsername(mail);
            veriRegistAccount(mail)
              .then((res) => {
                let ticket = "";
                if (res.data.Success) {
                  ticket = res.data.Data.register_ticket;
                  handleTicket(ticket);
                  return sendMail(ticket).then((res) => {
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

export { RegistStep1 };
