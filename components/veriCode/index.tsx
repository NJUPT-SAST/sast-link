import { useState, useEffect } from "react";
import classNames from "classnames";
import styles from "./index.module.scss";

const VeriCode = () => {
  const [clickAble, setClickAble] = useState<boolean>(false);
  const [count, setCount] = useState<number>(60);

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

  return (
    <>
      <span
        aria-disabled={clickAble}
        onClick={(e) => {
          setClickAble(false);
          console.log(123);
          e.preventDefault();
        }}
        className={` ${styles.veriCode}
         ${classNames({
          [styles.clickAble]: clickAble,
        })}`}
      >
        {clickAble ? "" : `${count}s 后`}重新发送
      </span>
    </>
  );
};

export { VeriCode };
