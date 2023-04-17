import styles from "./index.module.scss";

const DotLoading = () => {
  return (
    <>
      <span className={styles.dotSpan}> </span>
      <span className={styles.dotSpan}> </span>
      <span className={styles.dotSpan}> </span>
    </>
  );
};

export { DotLoading };
