import { ReactNode } from "react";
import BackLayout from "@/components/Layout/BackLayout";
import { TopBar } from "@/components/topbar";
import classNames from "classnames";
import styles from "./page.module.scss";
import PageTransition from "@/components/pageTransition";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "用户中心 | SAST Link",
  description: "OAuth of SAST",
};

const Layout = (props: {
  children: ReactNode;
  infoPanel: ReactNode;
  appPanel: ReactNode;
  profilePanel: ReactNode;
  getInfo: ReactNode;
}) => {
  const { children, infoPanel, appPanel, profilePanel, getInfo } = props;
  return (
    <>
      <BackLayout type="yellow" />
      <TopBar />
      {getInfo}
      <PageTransition
        className="flex w-screen justify-center px-5"
        position="bottomToTop"
      >
        <div className={classNames(styles.homeContainer)}>
          <div className={styles.leftPanel}>
            {profilePanel}
            {infoPanel}
          </div>
          <div className={styles.rightPanel}>{children}</div>
        </div>
      </PageTransition>
      {appPanel}
    </>
  );
};

export default Layout;
