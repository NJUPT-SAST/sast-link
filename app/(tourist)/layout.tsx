"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthGuard = (props: { children: ReactNode }) => {
  const { children } = props;
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("Token")) {
      router.replace("/home");
    }
  });

  return <>{children}</>;
};

export default AuthGuard;
