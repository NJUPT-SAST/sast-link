import styles from "./index.module.scss";
import classNames from "classnames";

const BackLayout = (props: any) => {
  return (
    <>
      <div className={styles.bgLayout}>
        <div className={styles.yellow}></div>

        <div className={styles.blue}></div>

        <div className={styles.orange}></div>

        <div className={styles.green}></div>
      </div>
    </>
  );
};
export default BackLayout;
