import { MouseEventHandler, forwardRef, memo } from "react";
import Image, { StaticImageData } from "next/image";
import styles from "./index.module.scss";
import classNames from "classnames";
import defaultAvator from "@/public/defaultAvatar.png";
import closeSVG from "@/public/svg/Vector.svg";

interface AccountItemProps {
  index: number;
  selected: boolean;
  nickName?: string;
  mail?: string;
  avator?: string | StaticImageData;
  onFocus: MouseEventHandler;
  onClose: () => void;
}

const AccountItem = forwardRef<any, AccountItemProps>(
  function Account(props, ref?) {
    const { onClose, index, selected, onFocus, nickName, mail, avator } = props;

    return (
      <div
        onClick={onFocus}
        tabIndex={0}
        className={`${styles.itemContainer} ${classNames({
          [styles.selected]: selected,
        })}`}
      >
        <div className={`${styles.avator}`}>
          <Image
            src={avator ?? defaultAvator}
            alt={`avator`}
            height={44}
            width={44}
          />
        </div>
        <div className={`${styles.accountMsg}`}>
          <div className={`${styles.accountName}`}>{nickName ?? "Ming"}</div>
          <div className={`${styles.accountMail}`}>
            {mail ?? "B2100000@njupt.edu.cn"}
          </div>
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className={`${styles.closeIcon}`}
        >
          <Image src={closeSVG} alt={`close`} width={11} height={11} />
        </div>
      </div>
    );
  },
);

const MemorizedAccountItem = memo(AccountItem, (prevProps, nextProps) => {
  return (
    prevProps.selected === nextProps.selected &&
    prevProps.index === nextProps.index
  );
});

export { AccountItem, MemorizedAccountItem };
