import { Linkqueue } from "@/type/class/linkqueue";
import { useState, useRef } from "react";
import { Dispatch, SetStateAction } from "react";
import { MemoMessageItem } from "./messageItem";
import styles from "./index.module.scss";

interface messageProps {
  content: string;
  id: number;
  delay: number;
}

interface messageType extends messageProps {
  icon: "info" | "error" | "loading" | "success";
}

interface LinkType {
  timer: NodeJS.Timer;
  isTail: boolean;
  before: LinkType | null;
  next: LinkType;
  message: messageType;
  this: LinkType;
}

let GlobalsComponents: (props: any) => JSX.Element;

function Messagefn() {
  let msgHandler: Linkqueue<messageType, LinkType> | null = null;
  let fresh: Dispatch<SetStateAction<{}>> | null = null;

  function Message() {
    const [, setState] = useState<{}>({});
    const messages = useRef<Linkqueue<messageType, LinkType>>(
      new Linkqueue<messageType, LinkType>({
        next: null,
        tail: null,
        size: 0,
      }),
    );
    msgHandler = messages.current;
    fresh = setState;
    return (
      <>
        <div className={styles.messagePanel}>
          {messages.current.getMessage().map((value) => {
            return (
              <MemoMessageItem
                key={`${value.message.content}_${value.message.id}`}
                {...value.message}
              />
            );
          })}
        </div>
      </>
    );
  }

  GlobalsComponents = Message;

  return {
    info(props: { icon: "info"; content: string; delay?: number }) {
      const a = {
        ...props,
        id: -1,
        delay: props.delay ? props.delay + 0.5 : 6,
      };
      msgHandler?.addLinkNode(a);
      if (fresh) fresh({});

      setTimeout(() => {
        if (fresh === null) return;
        fresh({});
      }, a.delay * 1000);
    },
  };
}

export { Messagefn, GlobalsComponents };
