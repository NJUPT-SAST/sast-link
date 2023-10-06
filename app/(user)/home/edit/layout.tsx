"use client";

import classNames from "classnames";
import { ReactNode } from "react";
import styles from "./page.module.scss";
import { Icon } from "@/components/icon";
import { avatarIcon, cameraIcon } from "@/components/icon";
import { Button } from "@/components/button";
import { InputWithLabel } from "@/components/input/inputWithLabel";
const Layout = (props: { children: ReactNode }) => {
  return (
    <>
      <div className={classNames(styles.settingPanelList)}>
        <div className={classNames(styles.settingPanel)}>
          <div className={styles.settingPanelTitle}>头像设置</div>
          <div className={classNames(styles.avatar)}>
            <Icon {...avatarIcon} width={145} height={145} />
          </div>
          <Button className={classNames(styles.button)}>
            <Icon {...cameraIcon} />
            更换头像
          </Button>
        </div>

        <div className={classNames(styles.settingPanel)}>
          <div className={styles.settingPanelTitle}>邮箱设置</div>
          <InputWithLabel
            className={classNames(styles.input, styles.emailInput)}
            label={"邮箱"}
            name={"email"}
            error={{ error: false }}
            defaultValue={"Ming123@456.com"}
            disabled
          />
          <Button className={classNames(styles.button)}>重新绑定</Button>
        </div>

        <div className={classNames(styles.settingPanel)}>
          <div className={styles.settingPanelTitle}>编辑信息</div>
          <InputWithLabel
            className={classNames(styles.input)}
            label={"昵称"}
            name={"nickname"}
            error={{ error: false }}
            defaultValue="Ming"
          />
          <InputWithLabel
            className={classNames(styles.input)}
            label={"个人简介"}
            name={"introduce"}
            error={{ error: false }}
          />
          <Button className={classNames(styles.button)}>提交</Button>
        </div>
      </div>
    </>
  );
};

export default Layout;
