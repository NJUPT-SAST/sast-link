"use client";

import { useRouter } from "next/navigation";
import useSWR from "swr";
import { getUserInfo } from "@/lib/apis/user";
import { Suspense } from "react";
import classNames from "classnames";
import styles from "./page.module.scss";
import avatar from "@public/defaultAvator.png";
import { qqIcon, githubIcon, msIcon, feishuIcon } from "@/components/icon";
import { Icon24, Icon } from "@/components/icon";

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
      <div className={classNames(styles.profileCard)}>
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
        <div className={classNames(styles.linkSide)}>个人界面</div>
      </div>

      <div className={classNames(styles.bindPanel)}>
        <div className={classNames(styles.bindApp)}>
          <div className={classNames(styles.appMessage)}>
            <Icon24 {...qqIcon} />
            <span>QQ</span>
          </div>
          <div className={classNames(styles.bindState)}>已绑定</div>
        </div>

        <div className={classNames(styles.bindApp)}>
          <div className={classNames(styles.appMessage)}>
            <Icon24 {...feishuIcon} />
            <span>SAST 飞书</span>
          </div>
          <div className={classNames(styles.bindState)}>已绑定</div>
        </div>

        <div className={classNames(styles.bindApp)}>
          <div className={classNames(styles.appMessage)}>
            <Icon24 {...githubIcon} />
            <span>Github</span>
          </div>
          <div className={classNames(styles.bindState)}>已绑定</div>
        </div>
        <div className={classNames(styles.bindApp)}>
          <div className={classNames(styles.appMessage)}>
            <Icon24 {...msIcon} />
            <span>Microsoft</span>
          </div>
          <div className={classNames(styles.bindState)}>已绑定</div>
        </div>
      </div>
    </Suspense>
  );
};

export default Home;
