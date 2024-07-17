import type { ReactNode } from "react";
import classNames from "classnames";
import styles from "./index.module.scss";
import { message } from "@/components/message";

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
            // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
            <li
              // onClick={() => {
              // 	message.warning("暂未开放");
              // }}
              key={`other_login_${item.describe}`}
            >
              <a
                title={item.describe}
                href={`${item.target}?redirect_url=${location.protocol}//${location.host}/callback/feishu`}
              >
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
