"use client";

import classNames from "classnames";
import vector from "@public/svg/Vector.svg";
import avatar from "@public/defaultAvator.png";
import Image from "next/image";
import { Anchor } from "@/components/anchor";
import styles from "./page.module.scss";
import auth from "@public/svg/auth.svg";
import { Button } from "@/components/button";
import { useAppDispatch, useAppSelector } from "@/redux";
import { handleHomeInfoPanel } from "@/redux/features/panelState";

const Messagepanel = () => {
  const infoPanelState = useAppSelector(
    (state) => state.panelState.homeInfoPanel,
  );
  const dispatch = useAppDispatch();
  return (
    <>
      <div
        onClick={() => {
          dispatch(handleHomeInfoPanel(false));
        }}
        className={classNames(styles.musk, {
          [styles.muskHidden]: !infoPanelState,
        })}
      />
      <div
        className={classNames(styles.messagePanel, {
          [styles.messagePanelHidden]: !infoPanelState,
        })}
      >
        <Image
          className={styles.closeIcon}
          onClick={() => {
            dispatch(handleHomeInfoPanel(false));
          }}
          src={vector}
          alt="close icon"
          width={16}
          height={16}
        />
        <div className={styles.userBasicMessage}>
          <Image
            className={styles.avatar}
            src={avatar}
            alt="avatar"
            width={64}
            height={64}
          />
          <div className={styles.userProfile}>
            <div className={styles.userNickname}>Ming</div>
            <div className={styles.userEmail}>Ming123@456.com</div>
            <div className={styles.userPosition}>
              <Image src={auth} alt={"auth icon"} />
              <span>SAST 认证：南邮校科协软件研发部 老东西</span>
            </div>
          </div>
          <div className={styles.userBasicInfo}>
            <div className={styles.infoTitle}>基本信息</div>
            <div className={styles.userNickname}>
              <div className={styles.infoLabel}>昵称</div>
              <div className={styles.content}>Ming</div>
            </div>
            <div className={styles.userEmail}>
              <div className={styles.infoLabel}>邮箱</div>
              <div className={styles.content}>Ming123@456.com</div>
            </div>
            <div className={styles.userIntro}>
              <div className={styles.infoLabel}>个人简介</div>
              <div className={styles.content}>
                member of @NJUPT-SAST.Learning computer vision & web dev
              </div>
            </div>
            <div className={styles.socialLink}>
              <div className={styles.infoLabel}>社交链接</div>
              <div className={styles.content}>
                <span className={styles.socialLinkItem}>
                  https://link.sast.fun
                </span>
                <span className={styles.socialLinkItem}>
                  https://link.sast.fun
                </span>
                <span className={styles.socialLinkItem}>
                  https://link.sast.fun
                </span>
              </div>
            </div>
          </div>
          <div className={styles.anchorList}>
            <Anchor
              className={classNames(styles.anchor)}
              black
              href={"/home/edit"}
            >
              编辑信息
            </Anchor>
            <Button white className={styles.button}>
              退出登录
            </Button>
          </div>
        </div>
      </div>

      <div className={classNames(styles.homeLeftInfoPanel)}>
        <div className={styles.userIntro}>
          <div className={styles.infoLabel}>个人简介</div>
          <div className={styles.content}>
            member of @NJUPT-SAST.Learning computer vision & web dev
          </div>
        </div>
        <div className={styles.socialLink}>
          <div className={styles.infoLabel}>社交链接</div>
          <div className={styles.content}>
            <span className={styles.socialLinkItem}>https://link.sast.fun</span>
            <span className={styles.socialLinkItem}>https://link.sast.fun</span>
            <span className={styles.socialLinkItem}>https://link.sast.fun</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Messagepanel;
