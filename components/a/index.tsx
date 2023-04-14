import Link from "next/link";
import { ReactNode, forwardRef } from "react";
import classNames from "classnames";
import styles from "./index.module.scss";

interface AProps {
  className?: (string | { [key: string]: boolean })[];
  children: ReactNode;
  href: string;
  outer?: boolean;
  black?: boolean;
}

const A = forwardRef<HTMLAnchorElement, AProps>(function A(props, ref?) {
  const {
    black = false,
    className = [],
    outer = false,
    children,
    href,
  } = props;

  if (!outer)
    return (
      <>
        <Link
          className={`${styles.a}  ${classNames(
            { [styles.black]: black },
            ...className,
          )}`}
          href={href}
          ref={ref}
        >
          {children}
        </Link>
      </>
    );

  return (
    <>
      <a
        className={`${styles.a} ${classNames(...className)}`}
        href={href}
        ref={ref}
      >
        {children}
      </a>
    </>
  );
});

export { A };
