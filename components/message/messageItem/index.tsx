import styles from "../index.module.scss";
import { memo } from "react";
import { Success, Error, Info } from "./icons";

interface InfoMessageProps {
  id: string | number;
  icon?: string;
  delay: number;
  content: string;
}

const MessageItem = (props: InfoMessageProps) => {
  const { icon, delay, content } = props;
  return (
    <>
      <div
        style={{ "--time-delay": `${delay - 0.5}s` }}
        className={`${styles.messageContainer}`}
      >
        {(() => {
          switch (icon) {
            case "loading":
              return "loading";
            case "info":
              return <Info />;
            case "error":
              return <Error />;
            case "sucess":
              return <Success />;
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
    pre.id === next.id &&
    pre.delay === next.delay &&
    pre.icon === next.icon
  );
});

export { MessageItem, MemoMessageItem };
