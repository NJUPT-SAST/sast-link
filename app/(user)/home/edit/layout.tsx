"use client";

import classNames from "classnames";
import { ReactNode } from "react";
import styles from "./page.module.scss";
import PageTransition from "@/components/pageTransition";

const Layout = (props: { children: ReactNode }) => {
  return (
    <>
      <PageTransition
        style={{ display: "flex", justifyContent: "center" }}
        position="bottomToTop"
      >
        <div className={classNames(styles.settingPanelListLayout)}>
          {props.children}
        </div>
      </PageTransition>
    </>
  );
};

export default Layout;
