import { ReactNode, forwardRef } from "react";
import { Input } from "..";
import styles from "./index.module.scss";
import { Dispatch, SetStateAction } from "react";
import classNames from "classnames";
import { handleError } from "@/components/function";
import { UseFormRegister, UseFormRegisterReturn } from "react-hook-form";

interface InputWithLabelProps {
  type?: "password";
  children?: ReactNode;
  maxLength?: number;
  disabled?: boolean;
  className?: string;
  label: string;
  name: string;
  defaultValue?: string;
  palceholder?: string;
  error: { error: false } | { error: true; errMsg: string };
  veridate?: (value: string) => false | string;
  setErrorState?: Dispatch<
    SetStateAction<{ error: false } | { error: true; errMsg: string }>
  >;
  withBlur?: () => void;
  inputProps?: UseFormRegisterReturn<any>;
}

const InputWithLabel = forwardRef<HTMLInputElement, InputWithLabelProps>(
  function InputWithlabel(props: InputWithLabelProps, ref?) {
    const {
      disabled = false,
      type,
      className = "",
      withBlur,
      children = false,
      veridate = () => false,
      setErrorState,
      maxLength,
      label,
      error,
      name,
      defaultValue,
      palceholder,
      inputProps,
    } = props;

    return (
      <>
        <label className={styles.inputWithLabel}>
          <span
            className={classNames(
              styles.labelDefault,
              { [styles.label]: !error.error },
              { [styles.errMsg]: error.error },
            )}
          >
            {error.error ? error.errMsg : label}
          </span>

          <Input
            {...inputProps}
            disabled={disabled}
            type={type}
            onBlur={(e) => {
              if (withBlur) {
                withBlur();
              }
              if (setErrorState)
                setErrorState(handleError(veridate(e.currentTarget.value)));
            }}
            onFocus={(e) => {
              if (setErrorState) setErrorState(handleError(false));
            }}
            aria-label={label}
            maxLength={maxLength}
            placeholder={palceholder}
            error={error.error}
            label={label}
            name={name}
            defaultValue={defaultValue}
            ref={ref}
            className={className}
          />
          {children && <div className={styles.afterContent}>{children}</div>}
        </label>
      </>
    );
  },
);

export { InputWithLabel };
