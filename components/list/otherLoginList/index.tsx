import { ReactNode } from "react";
import classNames from "classnames";
import styles from "./index.module.scss";

const OtherLoginList = (props: {
  list: {
    target: string;
    describe: string;
    icon: ReactNode;
  }[];
}) => {
  const { list } = props;
  return (
    <>
      <ul className={classNames([styles.icons])}>
        {list.map((item) => {
          return (
            <li key={`other_login_${item.describe}`}>
              <a title={item.describe} href={item.target}>
                {item.icon}
              </a>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export { OtherLoginList };
