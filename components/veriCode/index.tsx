import { useContext, useState, useEffect } from "react";
import classNames from "classnames";
import styles from "./index.module.scss";
import { RegistContext } from "@/lib/context";
import { sendMail, veriRegistAccount } from "@/lib/apis/global";

const VeriCode = () => {
  const [clickable, setClickable] = useState<boolean>(false);
  const [count, setCount] = useState<number>(60);
  const { username = "",handleTicket } = useContext(RegistContext);

  useEffect(() => {
    let intervalId: NodeJS.Timer;
    if (clickable === false) {
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
                console.log(res.data.Data.register_ticket);
                const ticket  = res.data.Data.register_ticket
                handleTicket(ticket)
                return sendMail(ticket);
              },
              (err) => console.log(err)
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
