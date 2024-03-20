import { useContext, useState, useEffect } from "react";
import classNames from "classnames";
import styles from "./index.module.scss";
import { RegistContext, ResetContext } from "@/lib/context";
import {
  sendMail,
  veriRegistAccount,
  veriResetAccount,
} from "@/lib/apis/global";

const VeriCode = (props: { reset?: true }) => {
  const [clickable, setClickable] = useState<boolean>(false);
  const [count, setCount] = useState<number>(60);
  const { username = "", handleTicket } = useContext(RegistContext);
  const resetContext = useContext(ResetContext);

  useEffect(() => {
    let intervalId: NodeJS.Timer;
    if (!clickable) {
      intervalId = setInterval(() => {
        setCount((pre) => {
          if (pre <= 0) {
            setClickable(true);
            clearInterval(intervalId);
            return 60;
          }
          return pre - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [clickable]);

  if (props.reset) {
    return (
      <>
        <span
          aria-disabled={clickable}
          onClick={() => {
            setClickable(false);
            // console.log(resetContext.username);
            veriResetAccount(resetContext.username ?? "")
              .then((res) => {
                if (res.data.Success) {
                  const ticket = res.data.Data.resetPwdTicket;
                  resetContext.handleTicket(ticket);
                  return sendMail(ticket, "reset");
                }
              })
              .then((res) => console.log(res))
              .catch((err) => console.log(err));
          }}
          className={` ${styles.veriCode}
     ${classNames({
       [styles.clickable]: clickable,
     })}`}
        >
          {clickable ? "" : `${count}s 后`}重新发送
        </span>
      </>
    );
  }

  return (
    <>
      <span
        aria-disabled={clickable}
        onClick={() => {
          setClickable(false);
          console.log(username);
          veriRegistAccount(username)
            .then(
              (res) => {
                if (res.data.Success) {
                  const ticket = res.data.Data.registerTicket;
                  handleTicket(ticket);
                  return sendMail(ticket);
                }
              },
              (err) => console.log(err),
            )
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
        }}
        className={` ${styles.veriCode}
         ${classNames({
           [styles.clickable]: clickable,
         })}`}
      >
        {clickable ? "" : `${count}s 后`}重新发送
      </span>
    </>
  );
};

export { VeriCode };
