import { ReactNode } from "react";
import BackLayout from "@/components/Layout/BackLayout";
import { TopBar } from "@/components/topbar";
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
      {children}
      {appPanel}
      {infoPanel}
    </>
  );
};

export default Layout;
