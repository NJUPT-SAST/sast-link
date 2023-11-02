import { ReactNode } from "react";
import BackLayout from "@/components/Layout/BackLayout";
import { TopBar } from "@/components/topbar";
import classNames from "classnames";
import styles from "./page.module.scss";

const Layout = (props: {
  children: ReactNode;
  infoPanel: ReactNode;
  appPanel: ReactNode;
  profilePanel: ReactNode;
  getInfo: ReactNode;
}) => {
  console.log(props);
  const { children, infoPanel, appPanel, profilePanel, getInfo } = props;
  return (
    <>
      <BackLayout type="yellow" />
      <TopBar />
      {getInfo}
      <div className={classNames(styles.homeContainer)}>
        <div className={styles.leftPanel}>
          {profilePanel}
          {infoPanel}
        </div>
        <div className={styles.rightPanel}>{children}</div>
      </div>
      {appPanel}
    </>
  );
};

export default Layout;
