import Link from "next/link";
import { ReactNode, forwardRef } from "react";
import classNames from "classnames";
import styles from "./index.module.scss";

interface AProps {
  children: ReactNode;
  href: string;
}

const A = forwardRef<HTMLAnchorElement, AProps>(function A(props: any, ref?) {
  const { children, href } = props;

  return (
    <>
        <Link className={`${styles.a} ${classNames()}`} href={href} ref={ref}>
          {children}
        </Link>
    </>
  );
});

export { A };
