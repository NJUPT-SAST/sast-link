// import { MessageLinkType, MessageItemPropsType, IconType } from "./type";
// // import { Linkqueue } from "@/type/class/linkqueue";
// import { useState, useRef } from "react";
// import { Dispatch, SetStateAction } from "react";
// import { MemoMessageItem } from "./messageItem";
// import styles from "./index.module.scss";

// let GlobalMessagePanel: () => JSX.Element;

// const Message = Messagefn();

// function Messagefn() {
//   let msgHandler: Linkqueue<MessageItemPropsType, MessageLinkType> | null =
//     null;
//   let fresh: Dispatch<SetStateAction<{}>> | null = null;

//   function MessagePanel() {
//     const [, setState] = useState<{}>({});
//     const messages = useRef<Linkqueue<MessageItemPropsType, MessageLinkType>>(
//       new Linkqueue<MessageItemPropsType, MessageLinkType>({
//         next: null,
//         tail: null,
//         size: 0,
//       }),
//     );
//     msgHandler = messages.current;
//     fresh = setState;
//     return (
//       <>
//         <div className={styles.messagePanel}>
//           {messages.current.getMessage().map((value) => {
//             return (
//               <MemoMessageItem
//                 key={`${value.message.content}_${value.message.id}`}
//                 {...value.message}
//               />
//             );
//           })}
//         </div>
//       </>
//     );
//   }
//   /**
//    *  添加新消息
//    * @param icon message 图标的文本描述
//    * @param content message 中的文本内容
//    * @param delay 延迟时间
//    * @returns void 无返回值
//    */
//   function addMessage(icon: IconType, content: string, delay: number) {
//     if (msgHandler === null) return;
//     const a = {
//       icon: icon,
//       content: content,
//       id: -1,
//       delay: delay,
//     } as MessageItemPropsType;
//     msgHandler.addLinkNode(a);
//     if (fresh) fresh({});

//     setTimeout(() => {
//       if (fresh === null) return;
//       fresh({});
//     }, a.delay * 1000);
//   }

//   GlobalMessagePanel = MessagePanel;

//   return {
//     /**
//      *  创建 info message 弹窗
//      * @param content message 中的文本内容
//      * @param delay 延迟时间，默认是 3s
//      */
//     info(content: string, delay: number = 3) {
//       addMessage("info", content, delay + 0.5);
//     },
//     /**
//      *  创建 success message 弹窗
//      * @param content message 中的文本内容
//      * @param delay 延迟时间，默认是 3s
//      */
//     success(content: string, delay: number = 3) {
//       addMessage("success", content, delay + 0.5);
//     },
//     /**
//      *  创建 error message 弹窗
//      * @param content message 中的文本内容
//      * @param delay 延迟时间，默认是 3s
//      */
//     error(content: string, delay: number = 3) {
//       addMessage("error", content, delay + 0.5);
//     },
//     /**
//      *  创建 warning message 弹窗
//      * @param content message 中的文本内容
//      * @param delay 延迟时间，默认是 3s
//      */
//     warning(content: string, delay: number = 3) {
//       addMessage("warning", content, delay + 0.5);
//     },
//   };
// }

// export { Message, GlobalMessagePanel };
