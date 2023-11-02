"use client";

import classNames from "classnames";
import { ReactNode } from "react";
import styles from "./page.module.scss";
import { Icon } from "@/components/icon";
import { avatarIcon, cameraIcon } from "@/components/icon";
import { Button } from "@/components/button";
import { InputWithLabel } from "@/components/input/inputWithLabel";
import { useAppSelector } from "@/redux";
import { useState } from "react";

const map = [
  ["软件研发部", "C#组"],
  ["软件研发部", "C++组"],
  ["软件研发部", "Python组"],
  ["软件研发部", "Lambda组"],
  ["软件研发部", "前端组"],
  ["软件研发部", "后端组"],
  ["软件研发部", "运维组"],
  ["软件研发部", "算法组"],
  ["软件研发部", "安全组"],
  ["软件研发部", "游戏组"],
  ["电子部", "单片机与控制算法方向"],
  ["电子部", "模拟电子与信号方向"],
  ["电子部", "图片处理与嵌入式人工智能"],
  ["电子部", "EDA方向"],
  ["电子部", "数字电路与FPGA方向"],
  ["多媒体部", "动效方向"],
  ["多媒体部", "三维方向"],
  ["多媒体部", "摄影与剪辑方向"],
  ["多媒体部", "音频方向"],
  ["办公室", ""],
  ["外联部", ""],
  ["科宣部", ""],
  ["赛事部", ""],
  ["SAST工作室", ""],
  ["主席团", ""],
];

const Layout = (props: { children: ReactNode }) => {
  const userBasicInfo = useAppSelector((state) => state.userBasicInfo);
  const [editMEssage, setEditMessage] = useState({
    nickname: userBasicInfo.nickname,
    org_id: ((dep: string | null, org: string | null) => {
      if (dep === null) return null;
      for (let i = 0; i < 19; i++) {
        if (dep === map[i][0] && org === map[i][1]) return i + 1;
      }
      for (let i = 19; i < map.length; i++) {
        if (dep === map[i][0]) return i + 1;
      }
      return null;
    })(userBasicInfo.dep, userBasicInfo.org),
    bio: userBasicInfo.bio,
    link: userBasicInfo.link,
    hide: userBasicInfo.hide,
  });
  return (
    <>
      <div className={classNames(styles.settingPanelList)}>
        <div className={classNames(styles.settingPanel)}>
          <div className={styles.settingPanelTitle}>头像设置</div>
          <div className={classNames(styles.avatar)}>
            <Icon {...avatarIcon} width={145} height={145} />
          </div>
          <div className={styles.formContainer}>
            <Button className={classNames(styles.button)}>
              <Icon {...cameraIcon} />
              更换头像
            </Button>
          </div>
        </div>

        <div className={classNames(styles.settingPanel)}>
          <div className={styles.settingPanelTitle}>邮箱设置</div>
          <div className={styles.formContainer}>
            <InputWithLabel
              className={classNames(styles.input, styles.emailInput)}
              label={"邮箱"}
              name={"email"}
              error={{ error: false }}
              defaultValue={userBasicInfo.email}
              disabled
            />
          </div>
          <div className={styles.formContainer}>
            <Button className={classNames(styles.button)}>重新绑定</Button>
          </div>
        </div>

        <div className={classNames(styles.settingPanel)}>
          <div className={styles.settingPanelTitle}>编辑信息</div>
          <div className={styles.formContainer}>
            <InputWithLabel
              className={classNames(styles.input)}
              label={"昵称"}
              name={"nickname"}
              error={{ error: false }}
              defaultValue="Ming"
            />
          </div>
          <div className={styles.formContainer}>
            <InputWithLabel
              className={classNames(styles.input)}
              label={"个人简介"}
              name={"introduce"}
              error={{ error: false }}
            />
          </div>
          <div className={styles.formContainer}>
            <Button className={classNames(styles.button)}>提交</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
