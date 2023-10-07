import { ReactNode } from "react";
import BackLayout from "@/components/Layout/BackLayout";
import { TopBar } from "@/components/topbar";
import classNames from "classnames";
import styles from "./page.module.scss"

const Layout = (props: {
  children: ReactNode;
  infoPanel: ReactNode;
  appPanel: ReactNode;
}) => {
  const { children, infoPanel, appPanel } = props;
  return (
    <>
      <BackLayout type="yellow" />
      <TopBar />
      <div className={classNames(styles.homeContainer)}>
      {children}
      {infoPanel}
      </div>
      {appPanel}
    </>
  );
};

export default Layout;
