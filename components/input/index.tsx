import { forwardRef } from "react";
import classNames from "classnames";
import styles from "./index.module.scss";
import { FocusEventHandler, ChangeEventHandler } from "react";
interface InputProps {
  // veridate?: (value: string) => boolean;
  type?: "password";
  disabled?: boolean;
  className?: string;
  name?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  maxLength?: number;
  label?: string;
  error?: boolean;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input(props, ref?) {
    const {
      disabled = false,
      type,
      error = false,
      maxLength,
      className = "",
      name = "",
      placeholder,
      value,
      defaultValue,
      label,
      onChange,
      onFocus,
      onBlur,
    } = props;

    return (
      <>
        <input
          disabled={disabled}
          type={type}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          name={name}
          aria-label={label}
          className={`${styles.input} ${classNames(className, {
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
  },
);

export { Input };
