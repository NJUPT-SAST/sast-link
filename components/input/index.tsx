import { forwardRef } from "react";
import classNames from "classnames";
import styles from "./index.module.scss";

interface InputProps {
  className?: (string | { [key: string]: boolean })[];
  name?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  maxLength?: number;
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  props,
  ref?,
) {
  const {
    maxLength,
    className = [],
    name = "",
    placeholder,
    value,
    defaultValue,
  } = props;

  return (
    <>
      <input
        name={name}
        className={`${styles.input} ${classNames(...className)}`}
        maxLength={maxLength}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        ref={ref}
      />
    </>
  );
});

export { Input };
