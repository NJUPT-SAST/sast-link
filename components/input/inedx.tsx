import { forwardRef } from "react";
import classNames from "classnames";
import styles from "./index.module.scss";

interface InputProps {
  afterContent?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  props,
  ref?,
) {
  const { afterContent, placeholder, value, defaultValue } = props;

  return (
    <>
      <input
        className={`${styles.input} ${classNames()}`}
        style={{
          "--content-after": afterContent,
        }}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        ref={ref}
      />
    </>
  );
});

export { Input };
