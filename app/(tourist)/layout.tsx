"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthGuard = (props: { children: ReactNode }) => {
  const { children } = props;
  const router = useRouter();
  const localToken = localStorage.getItem("Token");

  useEffect(() => {
    if (localToken) {
      router.replace("/home");
    }
  });

  return <>{children}</>;
};

export default AuthGuard;
