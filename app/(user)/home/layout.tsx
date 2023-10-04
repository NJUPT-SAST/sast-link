"use client";

import { MenuIcon } from "@/components/icon/menu";
import { Logo } from "@/components/icon";
import { ReactNode } from "react";
import styles from "./page.module.scss";
import classNames from "classnames";
import avatar from "@public/defaultAvator.png";
import Image from "next/image";
import BackLayout from "@/components/Layout/BackLayout";
import qq from "@public/svg/qq.svg";
import feishu from "@public/svg/feishu.svg";
import github from "@public/svg/github.svg";
import { useAppDispatch } from "@/redux";
import {
  handleHomeAppPanel,
  handleHomeInfoPanel,
} from "@/redux/features/panelState";

const Layout = (props: {
  children: ReactNode;
  infoPanel: ReactNode;
  appPanel: ReactNode;
}) => {
  const dispatch = useAppDispatch();
  const { children, infoPanel, appPanel } = props;
  return (
    <>
      <BackLayout type="yellow" />
      <div className={classNames(styles.topbar)}>
        <div
          onClick={() => {
            dispatch(handleHomeAppPanel(true));
          }}
        >
          <MenuIcon />
        </div>
        <Logo />
        <div className={classNames(styles.avatar)}>
          <Image
            onClick={() => {
              dispatch(handleHomeInfoPanel(true));
            }}
            src={avatar}
            alt="avatar"
            width={36}
            height={36}
          />
        </div>
      </div>
      <div className={classNames(styles.placeholder)} />

      <div className={classNames(styles.profileCard)}>
        <div className={classNames(styles.messageSide)}>
          <div className={classNames(styles.avatar_large)}>
            <Image src={avatar} alt={"user avatar"} width={140} height={140} />
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
            <Image src={qq} alt="qq icon" width={24} height={24} /> QQ
          </div>
          <div className={classNames(styles.bindState)}>已绑定</div>
        </div>

        <div className={classNames(styles.bindApp)}>
          <div className={classNames(styles.appMessage)}>
            <Image src={feishu} alt="feishu icon" width={24} height={24} /> SAST
            飞书
          </div>
          <div className={classNames(styles.bindState)}>已绑定</div>
        </div>

        <div className={classNames(styles.bindApp)}>
          <div className={classNames(styles.appMessage)}>
            <Image src={github} alt="github icon" width={24} height={24} />
            GitHub
          </div>
          <div className={classNames(styles.bindState)}>已绑定</div>
        </div>
      </div>
      {appPanel}
      {infoPanel}
    </>
  );
};

export default Layout;
