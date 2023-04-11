import { ButtonHTMLAttributes, ReactNode, forwardRef } from "react";
import classNames from "classnames";
import styles from "./index.module.scss";
import { MouseEventHandler } from "react";
import NextButton from "./nextButton";

interface ButtonProps {
  title?:string;
  type?: "submit" | "button";
  white?: boolean;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  props,
  ref?,
) {
  const { title, type, children, onClick, white = false } = props;
  return (
    <>
      <button
      title={title}
        ref={ref}
        className={`${styles.button} ${classNames({
          [styles.colorReverse]: white,
        })}`}
        onClick={onClick}
        type={type ?? "button"}
      >
        {children}
      </button>
    </>
  );
});

export { Button, NextButton };
