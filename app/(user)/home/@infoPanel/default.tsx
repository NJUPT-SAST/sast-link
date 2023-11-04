"use client";

import classNames from "classnames";
import vector from "@public/svg/Vector.svg";
import avatar from "@public/defaultAvatar.png";
import Image from "next/image";
import { Anchor } from "@/components/anchor";
import styles from "./page.module.scss";
import auth from "@public/svg/auth.svg";
import { Button } from "@/components/button";
import { useAppDispatch, useAppSelector } from "@/redux";
import { handleHomeInfoPanel } from "@/redux/features/panelState";
import { useRouter } from "next/navigation";
import { resetBasicInfo } from "@/redux/features/userBasicInfo";
import { message } from "@/components/message";

const Messagepanel = () => {
  const infoPanelState = useAppSelector(
    (state) => state.panelState.homeInfoPanel,
  );
  const userBasicInfo = useAppSelector((state) => state.userBasicInfo);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const hidePanel = () => {
    dispatch(handleHomeInfoPanel(false));
  }

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
            src={userBasicInfo.avatar ?? avatar}
            alt="avatar"
            width={64}
            height={64}
          />
          <div className={styles.userProfile}>
            <div className={styles.userNickname}>{userBasicInfo.nickname}</div>
            <div className={styles.userEmail}>{userBasicInfo.email}</div>
            {/* <div className={styles.userPosition}>
              <Image src={auth} alt={"auth icon"} />
              <span>SAST 认证：南邮校科协{userBasicInfo.dep} 老东西</span>
            </div> */}
          </div>
          <div className={styles.userBasicInfo}>
            <div className={styles.infoTitle}>基本信息</div>
            <div className={styles.userNickname}>
              <div className={styles.infoLabel}>昵称</div>
              <div className={styles.content}>{userBasicInfo.nickname}</div>
            </div>
            <div className={styles.userEmail}>
              <div className={styles.infoLabel}>邮箱</div>
              <div className={styles.content}>{userBasicInfo.email}</div>
            </div>
            <div className={styles.userIntro}>
              <div className={styles.infoLabel}>个人简介</div>
              <div className={styles.content}>{userBasicInfo.bio}</div>
            </div>
            <div className={styles.socialLink}>
              <div className={styles.infoLabel}>社交链接</div>
              <div className={styles.content}>
                {userBasicInfo.link &&
                  userBasicInfo.link.map((value, index) => {
                    return (
                      <a
                        href={value}
                        target="_blank"
                        key={`${userBasicInfo.email}-${value}-${index}`}
                        className={styles.socialLinkItem}
                      >
                        {value}
                      </a>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className={styles.anchorList}>
            <Anchor
              className={classNames(styles.anchor)}
              black
              href={"/home/edit"}
              onClick={hidePanel}
            >
              编辑信息
            </Anchor>
            <Anchor
              className={classNames(styles.anchor)}
              black
              href={"/home/edit/safety"}
              onClick={hidePanel}
            >
              安全与隐私
            </Anchor>
            {
              // TODO logout
            }
            <Button onClick={() => {
              dispatch(resetBasicInfo())
              router.replace('/login')
              localStorage.removeItem('Token')
              localStorage.removeItem('userList')
              localStorage.removeItem('userProfile')
              message.success('退出成功')
              hidePanel()
            }} white className={styles.button}>
              退出登录
            </Button>
          </div>
        </div>
      </div>

      <div className={classNames(styles.homeLeftInfoPanel)}>
        <div className={styles.userIntro}>
          <div className={styles.infoLabel}>个人简介</div>
          <div className={styles.content}>{userBasicInfo.bio ?? '还没有内容哦'}</div>
        </div>
        <div className={styles.socialLink}>
          <div className={styles.infoLabel}>社交链接</div>
          <div className={styles.content}>
            {!userBasicInfo.link ? '还没有链接哦' :
              userBasicInfo.link.map((value, index) => {
                return (
                  <a
                    href={value}
                    target="_blank"
                    key={`${userBasicInfo.email}-${value}-${index}`}
                    className={styles.socialLinkItem}
                  >
                    {value}
                  </a>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Messagepanel;
