import { type FormEvent, forwardRef, useCallback, ReactNode } from "react";
import classNames from "classnames";
import styles from "./index.module.scss";

type ArrValue<T extends string> = T extends `${infer M}-${infer N}` ? M : never;

// type ArrValue<T extends readonly string[]> = {
//   [`${} ` K in keyof T] : any
// }

type formDataType = boolean | Blob | string | number | undefined;

interface FormProps {
  className?: (string | { [key: string]: boolean })[];
  children: ReactNode;
  readonly names: string[];
  onSubmit: (args: { [key: string]: formDataType }) => void;
}

const Form = forwardRef<HTMLFormElement, FormProps>(function Form(props, ref?) {
  const { className = "", children, names, onSubmit } = props;

  const handleSubmit = useCallback(
    function handleSubmit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const obj: { [key: string]: formDataType } = {};
      for (let value of names) {
        obj[value] = formData.get(value) ?? undefined;
      }
      onSubmit(obj);
    },
    [names, onSubmit],
  );

  return (
    <form
      onSubmit={handleSubmit}
      ref={ref}
      className={`${styles.form} ${classNames(...className)}`}
    >
      {children}
    </form>
  );
});

export { Form };
