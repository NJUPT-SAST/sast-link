import { ReactNode } from "react";
import { SWRProvider } from "@/components/swrProvider";

const Layout = (props: { children: ReactNode }) => {
  const { children } = props;
  const fallback = {
    infoUpdate: { Success: true, Data: { email: "", username: "" } },
  };
  return (
    <>
      <SWRProvider fallback={fallback}>{children}</SWRProvider>
    </>
  );
};

export default Layout;
