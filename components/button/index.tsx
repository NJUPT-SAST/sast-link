import { ReactNode, forwardRef } from "react";
import classNames from "classnames";
import styles from "./index.module.scss";

interface ButtonProps {
  type?: "submit" | "button";
  children: ReactNode;
  handleClick?: (e?: MouseEvent) => void;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  props: any,
  ref?,
) {
  const { type, children, handleClick } = props;
  return (
    <>
      <button
        ref={ref}
        className={`${styles.button} ${classNames()}`}
        onClick={handleClick}
        type={type ?? "button"}
      >
        {children}
      </button>
    </>
  );
});

export { Button };
