import { ReactNode } from "react";
import BackLayout from "@/components/Layout/BackLayout";
import { TopBar } from "@/components/topbar";
import classNames from "classnames";
import styles from "./page.module.scss";
import PageTransition from "@/components/pageTransition";

const Layout = (props: {
  children: ReactNode;
  infoPanel: ReactNode;
  appPanel: ReactNode;
  profilePanel: ReactNode;
  getInfo: ReactNode;
}) => {
  // console.log(props);
  const { children, infoPanel, appPanel, profilePanel, getInfo } = props;
  return (
    <>
      <BackLayout type="yellow" />
      <TopBar />
      {getInfo}
      <PageTransition
        style={{
          display: "flex",
          width: "100vw",
          justifyContent: "center",
        }}
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
