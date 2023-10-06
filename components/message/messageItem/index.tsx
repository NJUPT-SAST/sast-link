import styles from "../index.module.scss";
import { memo, useEffect, useState } from "react";
import { Success, Error, Info, Warning } from "./icons";
import { MessageItemPropsType } from "../type";
import classNames from "classnames";

const MessageItem = (props: MessageItemPropsType) => {
  const { icon, content, delay, fresh } = props;
  const [animationInState, setAnimationInState] = useState<boolean>(false);
  useEffect(() => {
    let timer: NodeJS.Timeout;
    setAnimationInState(true);
    timer = setTimeout(
      () => {
        setAnimationInState(false);
      },
      (delay - 0.5) * 1000,
    );
    return () => {
      clearTimeout(timer);
    };
  }, [delay, fresh]);
  return (
    <>
      <div
        style={{ "--time-delay": delay + "s" }}
        className={classNames(styles.messageContainer, {
          [styles.messageContainerIn]: animationInState,
        })}
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
    pre.icon === next.icon &&
    pre.fresh === next.fresh
  );
});

export { MessageItem, MemoMessageItem };
