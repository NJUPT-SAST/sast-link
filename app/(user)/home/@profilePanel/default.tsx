import classNames from "classnames";

import styles from "./page.module.scss";
import avatar from "@public/defaultAvator.png";
import {
  qqIcon,
  githubIcon,
  msIcon,
  feishuIcon,
  blackArrowheadIcon,
} from "@/components/icon";
import { Icon } from "@/components/icon";
import { BindAppItem } from "@/components/bindItem";
import Link from "next/link";

const ProfilePanel = () => {
  return (
    <>
      <div className={classNames(styles.profileCard, styles.default)}>
        <div className={classNames(styles.messageSide)}>
          <div className={classNames(styles.avatar_large)}>
            <Icon src={avatar} alt={"user avatar"} width={140} height={140} />
          </div>
          <div className={classNames(styles.userBasicMessage)}>
            <div className={classNames(styles.userName)}>Ming</div>
            <div className={classNames(styles.userEmail)}>Ming123@456.com</div>
          </div>

          <div className={classNames(styles.userPosition)}>
            软件研发中心 老东西
          </div>
        </div>
        <div className={classNames(styles.linkSide)}>
          <Link className={classNames(styles.toProfile)} href={"./home"}>
            <span>个人主页</span>
            <Icon {...blackArrowheadIcon} />
          </Link>
          <Link className={classNames(styles.toEdit)} href={"./home/edit"}>
            <span>编辑信息</span>
            <Icon {...blackArrowheadIcon} />
          </Link>
        </div>
      </div>

      <div className={classNames(styles.bindPanel, styles.default)}>
        <BindAppItem
          bindAppIconProps={qqIcon}
          bindAppTitle={"QQ"}
          binded={false}
        />

        <BindAppItem
          bindAppIconProps={feishuIcon}
          bindAppTitle={"SAST 飞书"}
          binded={false}
        />

        <BindAppItem
          bindAppIconProps={msIcon}
          bindAppTitle={"Microsoft"}
          binded={false}
        />

        <BindAppItem
          bindAppIconProps={githubIcon}
          bindAppTitle={"GutHub"}
          binded={false}
        />
      </div>
    </>
  );
};

export default ProfilePanel;
