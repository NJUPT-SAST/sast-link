import { ReactNode } from "react";
import styles from "./index.module.scss";
import classNames from "classnames";
import { SFMono } from "@/public/fonts";

interface LayoutProps {
  children: ReactNode;
  className?: (string | { [key: string]: boolean })[];
}

const Layout = (props: LayoutProps) => {
  const { className = [], children } = props;

  return (
    <>
      <div
        className={`${styles.layout} ${SFMono.variable} ${classNames(
          ...className
        )}`}
      >
        {children}
        {/* <div className={styles.title}>{title}</div>
        <div className={styles.container}></div> */}
      </div>
    </>
  );
};

export { Layout };
