"use client";
import styles from "./index.module.scss";
import { useAppDispatch, useAppSelector } from "@/redux";
import { removeMessage, replaceMessage } from "@/redux/features/message";
import { MemoMessageItem, MessageItem } from "./messageItem";
import { IconType } from "./type";
import { useEffect } from "react";

let GlobalMessagePanel: () => JSX.Element | null;

const message = Messagefn();

function Messagefn() {
  let id: NodeJS.Timeout;
  let dispatch: any = null;

  function MessagePanel() {
    const {
      icon,
      content,
      delay,
      fresh = false,
    } = useAppSelector((state) => state.message);
    dispatch = useAppDispatch();
    if (icon && content && delay) {
      return (
        <>
          <div className={styles.messagePanel}>
            <MessageItem
              icon={icon}
              fresh={fresh}
              content={content}
              delay={delay}
            />
          </div>
        </>
      );
    }
    return null;
  }

  /**
   *  添加新消息
   * @param icon message 图标的文本描述
   * @param content message 中的文本内容
   * @param delay 延迟时间
   * @returns void 无返回值
   */
  function addMessage(icon: IconType, content: string, delay: number) {
    if (id) {
      clearTimeout(id);
    }
    console.log(delay * 1000);
    if (dispatch) {
      id = setTimeout(() => {
        dispatch(removeMessage());
      }, delay * 1000);
      dispatch(replaceMessage({ icon, content, delay }));
    }
  }

  GlobalMessagePanel = MessagePanel;

  return {
    /**
     *  创建 info message 弹窗
     * @param content message 中的文本内容
     * @param delay 延迟时间，默认是 3s
     */
    info(content: string, delay: number = 3) {
      addMessage("info", content, delay + 0.5);
    },
    /**
     *  创建 success message 弹窗
     * @param content message 中的文本内容
     * @param delay 延迟时间，默认是 3s
     */
    success(content: string, delay: number = 3) {
      addMessage("success", content, delay + 0.5);
    },
    /**
     *  创建 error message 弹窗
     * @param content message 中的文本内容
     * @param delay 延迟时间，默认是 3s
     */
    error(content: string, delay: number = 3) {
      addMessage("error", content, delay + 0.5);
    },
    /**
     *  创建 warning message 弹窗
     * @param content message 中的文本内容
     * @param delay 延迟时间，默认是 3s
     */
    warning(content: string, delay: number = 3) {
      addMessage("warning", content, delay + 0.5);
    },
  };
}

export { message, GlobalMessagePanel };
