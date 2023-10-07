"use client";

import { useRouter } from "next/navigation";
import useSWR from "swr";
import { getUserInfo } from "@/lib/apis/user";
import { Suspense } from "react";
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

const getMessage = async () => {
  if (!localStorage.getItem("Token"))
    return { Success: false, Data: { username: "", email: "" } };
  const info = await getUserInfo();
  console.log(info);
  return info.data;
};

const Home = () => {
  const {
    data: { Success, Data },
  } = useSWR("infoUpdate", getMessage, { suspense: true });
  const router = useRouter();
  return (
    <Suspense fallback={<h1>数据加载中...</h1>}>
      <div className={styles.leftPanel}>
        <div className={classNames(styles.profileCard)}>
          <div className={classNames(styles.messageSide)}>
            <div className={classNames(styles.avatar_large)}>
              <Icon src={avatar} alt={"user avatar"} width={140} height={140} />
            </div>
            <div className={classNames(styles.userBasicMessage)}>
              <div className={classNames(styles.userName)}>Ming</div>
              <div className={classNames(styles.userEmail)}>
                Ming123@456.com
              </div>
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
          </div>
        </div>

        <div className={classNames(styles.bindPanel)}>
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
      </div>
    </Suspense>
  );
};

export default Home;
