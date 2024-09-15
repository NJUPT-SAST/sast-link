"use client";

import classNames from "classnames";

import styles from "./page.module.scss";
import avatar from "@public/defaultAvatar.png";
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
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/redux";
import useSWR from "swr";
import { getUserBindStatus } from "@/lib/apis/user";

const ProfilePanel = () => {
  const userBasicInfo = useAppSelector((state) => state.userBasicInfo);
  const pathname = usePathname();
  const { data } = useSWR("bindStatus", () =>
    getUserBindStatus().then((res) => res.data.data),
  );
  return (
    <>
      <div
        id="default"
        className={classNames(styles.profileCard, {
          [styles.default]: pathname !== "/home",
        })}
      >
        <div className={classNames(styles.messageSide)}>
          <div className={classNames(styles.avatar_large)}>
            <Icon
              src={userBasicInfo.avatar ?? avatar}
              style={{ objectFit: "cover" }}
              alt={"user avatar"}
              width={140}
              height={140}
            />
          </div>
          <div className={classNames(styles.userBasicMessage)}>
            <div className={classNames(styles.userName)}>
              {userBasicInfo.nickname}
            </div>
            <div className={classNames(styles.userEmail)}>
              {userBasicInfo.email}
            </div>
          </div>

          <div className={classNames(styles.userPosition)}>
            {userBasicInfo.dep === "" ? "暂无认证" : userBasicInfo.dep}
          </div>
        </div>
        <div className={classNames(styles.linkSide)}>
          {/* <Link className={classNames(styles.toProfile)} href={"./home"}>
            <span>个人主页</span>
            <Icon {...blackArrowheadIcon} />
          </Link> */}
          <Link className={classNames(styles.toEdit)} href={"/home/edit"}>
            <span>编辑信息</span>
            <Icon {...blackArrowheadIcon} />
          </Link>
          <Link
            className={classNames(styles.toEdit)}
            href={"/home/edit/safety/"}
          >
            <span>安全设置</span>
            <Icon {...blackArrowheadIcon} />
          </Link>
        </div>
      </div>

      <div
        className={classNames(styles.bindPanel, {
          [styles.default]: pathname !== "/home",
        })}
      >
        <BindAppItem
          bindAppIconProps={qqIcon}
          bindAppTitle={"QQ"}
          binded={data?.includes("qq") ?? false}
        />

        <BindAppItem
          bindAppIconProps={feishuIcon}
          bindAppTitle={"SAST 飞书"}
          binded={data?.includes("lark") ?? false}
        />

        <BindAppItem
          bindAppIconProps={msIcon}
          bindAppTitle={"Microsoft"}
          binded={data?.includes("microsoft") ?? false}
        />

        <BindAppItem
          bindAppIconProps={githubIcon}
          bindAppTitle={"GitHub"}
          binded={data?.includes("github") ?? false}
        />
      </div>
    </>
  );
};

export default ProfilePanel;
