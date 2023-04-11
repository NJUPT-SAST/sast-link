import { forwardRef } from "react";
import Image from "next/image";
import styles from "./index.module.scss";
import classNames from "classnames";
import avator from "../../public/defaultAvator.png";
import closeSVG from "../../public/svg/Vector.svg";

const AccountItem = forwardRef(function Account(props: any, ref?) {
  return (
    <div className={`${styles.itemContainer}`}>
      <div className={`${styles.avator}`}>
        <Image src={avator} alt={`avator`} height={44} width={44} />
      </div>
      <div className={`${styles.accountMsg}`}>
        <div className={`${styles.accountName}`}>Ming</div>
        <div className={`${styles.accountMail}`}>B2100000@njupt.edu.cn</div>
      </div>
      <div className={`${styles.closeIcon}`}>
        <Image src={closeSVG} alt={`close`} width={11} height={11} />
      </div>
    </div>
  );
});

export { AccountItem };
