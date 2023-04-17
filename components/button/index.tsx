import { ButtonHTMLAttributes, ReactNode, forwardRef } from "react";
import classNames from "classnames";
import styles from "./index.module.scss";
import { MouseEventHandler } from "react";
import NextButton from "./nextButton";
import { DotLoading } from "../dotLoading";

interface ButtonProps {
  title?: string;
  type?: "submit" | "button";
  white?: boolean;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: (string | { [key: string]: boolean })[];
  disabled?: boolean;
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  props,
  ref?,
) {
  const {
    loading = false,
    disabled = false,
    className = [],
    title,
    type,
    children,
    onClick,
    white = false,
  } = props;
  return (
    <>
      <button
        disabled={disabled || loading}
        title={title}
        ref={ref}
        className={`${styles.button} ${classNames(
          {
            [styles.colorReverse]: white,
          },
          ...className,
        )}`}
        onClick={onClick}
        type={type ?? "button"}
      >
        {loading ? (
          <>
            <DotLoading />
          </>
        ) : (
          children
        )}
      </button>
    </>
  );
});

export { Button, NextButton };
