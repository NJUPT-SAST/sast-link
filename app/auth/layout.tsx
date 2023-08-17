"use client";

import { ReactNode } from "react";

const Layout = (props: { children: ReactNode }) => {
  const { children } = props;
  return <>{children}</>;
};

export default Layout;
