import { forwardRef } from "react";
import Image, { StaticImageData } from "next/image";
import styles from "./index.module.scss";
import classNames from "classnames";
import defaultAvator from "../../public/defaultAvator.png";
import closeSVG from "../../public/svg/Vector.svg";

interface AccountItemProps {
  tabIndex: number;
  nickName?: string;
  mail?: string;
  avator?: string | StaticImageData;
}

const AccountItem = forwardRef<any, AccountItemProps>(function Account(
  props,
  ref?,
) {
  const { tabIndex, nickName, mail, avator } = props;

  return (
    <div tabIndex={tabIndex} className={`${styles.itemContainer}`}>
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
      <div className={`${styles.closeIcon}`}>
        <Image src={closeSVG} alt={`close`} width={11} height={11} />
      </div>
    </div>
  );
});

export { AccountItem };
