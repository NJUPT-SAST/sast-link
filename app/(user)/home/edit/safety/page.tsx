"use client";
import { Button } from "@/components/button";
import { InputWithLabel } from "@/components/input/inputWithLabel";
import userBasicInfo from "@/redux/features/userBasicInfo";
import classNames from "classnames";
import styles from "../page.module.scss";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux";
import Back from "@/components/back";
import PageTransition from "@/components/pageTransition";
import { message } from "@/components/message";

const Safety = () => {
  const route = useRouter();
  const userBasicInfo = useAppSelector((state) => state.userBasicInfo);
  return (
    <PageTransition className={styles.settingPanelList}>
      <div className={classNames(styles.settingPanel)}>
        <Back />
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
          <Button
            onClick={() => {
              // route.push('/home/edit/safety/reset/email')
              message.warning("功能未开放");
            }}
            className={classNames(styles.button)}
          >
            重新绑定
          </Button>
        </div>
      </div>
    </PageTransition>
  );
};

export default Safety;
