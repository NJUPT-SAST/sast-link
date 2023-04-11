import styles from "./index.module.scss";
import classNames from "classnames";

const BackLayout = (props: any) => {
  return (
    <>
      <div className={`${styles.layout} ${classNames(...props.className)}`}>{props.children}</div>
    </>
  );
};
export default BackLayout