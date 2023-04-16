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
  label?: string;
  error?: boolean;
  onBlur?: (value: string) => boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  props,
  ref?,
) {
  const {
    error = false,
    maxLength,
    className = [],
    name = "",
    placeholder,
    value,
    defaultValue,
    label,
    onBlur = (value: string) => true,
  } = props;

  return (
    <>
      <input
        onBlur={(e) => {
          onBlur(e.currentTarget.value);
        }}
        name={name}
        aria-label={label}
        className={`${styles.input} ${classNames(...className, {
          [styles.error]: error,
        })}`}
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
