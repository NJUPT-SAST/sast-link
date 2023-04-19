import { ReactNode } from "react";
import styles from "./index.module.scss";

interface FooterProps {
  children: ReactNode;
}

const Footer = (props: FooterProps) => {
  const { children } = props;
  return (
    <>
      <footer className={styles.footer}>{children}</footer>
    </>
  );
};
export { Footer };
