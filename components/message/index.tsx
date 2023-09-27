"use client";
import styles from "./index.module.scss";
import { useAppDispatch, useAppSelector } from "@/redux";
import { removeMessage, replaceMessage } from "@/redux/features/message";
import { MemoMessageItem } from "./messageItem";
import { IconType } from "./type";

let GlobalMessagePanel: () => JSX.Element | null;

const Message = Messagefn();

function Messagefn() {
  let id: NodeJS.Timeout;
  const dispatch = useAppDispatch();
  function MessagePanel() {
    const { icon, content } = useAppSelector((state) => state.message);
    if (icon && content) {
      return (
        <>
          <div className={styles.messagePanel}>
            <MemoMessageItem icon={icon} content={content} />
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
    id = setTimeout(() => {
      dispatch(removeMessage()), delay * 1000;
    });
    dispatch(replaceMessage({ icon, content }));
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

export { Message, GlobalMessagePanel };
