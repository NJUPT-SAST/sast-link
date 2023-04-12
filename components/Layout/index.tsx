import { ReactNode } from "react";
import styles from "./index.module.scss";
import classNames from "classnames";

interface LayoutProps {
  title: string;
  children: ReactNode;
  className?: (string | { [key: string]: boolean })[];
}

const Layout = (props: LayoutProps) => {
  const { className = [], title = "<sast link>", children } = props;

  return (
    <>
      <div className={`${styles.layout} ${classNames(...className)}`}>
        <div className={styles.title}>{title}</div>
        <div className={styles.container}>{children}</div>
      </div>
    </>
  );
};

export { Layout };
