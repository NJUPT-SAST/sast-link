import styles from "./index.module.scss";
import classNames from "classnames";

interface BackLayoutProps {
  type?: "green" | "orange" | "yellow" | "blue";
}

const BackLayout = (props: BackLayoutProps) => {
  const { type = "yellow" } = props;
  return (
    <>
      <div className={`${styles.bgLayout} ${styles.pc}`}>
        <div className={styles.blue} />
        <div className={styles.yellow} />
        <div className={styles.orange} />
        <div className={styles.green} />
      </div>
      <div className={`${styles.mobile} ${styles.bgLayout}`}>
        {type === "blue" && <div className={styles.blue} />}
        {type === "yellow" && <div className={styles.yellow} />}
        {type === "orange" && <div className={styles.orange} />}
        {type === "green" && <div className={styles.green} />}
      </div>
    </>
  );
};
export default BackLayout;
