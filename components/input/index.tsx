import { forwardRef } from "react";
import classNames from "classnames";
import styles from "./index.module.scss";

interface InputProps {
  className?: (string | { [key: string]: boolean })[];
  name?: string;
  afterContent?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  props,
  ref?,
) {
  const {
    className = [],
    name = "",
    afterContent,
    placeholder,
    value,
    defaultValue,
  } = props;

  return (
    <>
      <input
        name={name}
        className={`${styles.input} ${classNames(...className)}`}
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
