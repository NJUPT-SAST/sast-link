"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUserInfo } from "@/lib/apis/user";

const AuthGuard = (props: { children: ReactNode }) => {
  const { children } = props;
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("Token")) {
      getUserInfo()
        .then((res) => {
          if (res.data.Success) router.replace("/home");
        })
        .catch();
    }
  }, [router]);

  return <>{children}</>;
};

export default AuthGuard;
