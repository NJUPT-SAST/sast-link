import styles from "../index.module.scss";
import { memo } from "react";
import { Success, Error, Info, Warning } from "./icons";
import { MessageItemPropsType } from "../type";

const MessageItem = (props: MessageItemPropsType) => {
  const { icon, content, delay } = props;
  return (
    <>
      <div
        style={{ "--time-delay": delay + "s" }}
        className={`${styles.messageContainer}`}
      >
        {(() => {
          switch (icon) {
            case "success":
              return <Success />;
            case "info":
              return <Info />;
            case "warning":
              return <Warning />;
            case "error":
              return <Error />;
            case "loading":
              return "loading";
            default:
              return <Info />;
          }
        })()}
        <p>{content}</p>
      </div>
    </>
  );
};

const MemoMessageItem = memo(MessageItem, (pre, next) => {
  return (
    pre.content === next.content &&
    pre.delay === next.delay &&
    pre.icon === next.icon
  );
});

export { MessageItem, MemoMessageItem };
