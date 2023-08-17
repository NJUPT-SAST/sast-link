"use client";

import { getUserInfo } from "@/lib/apis/user";
import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux";
import { login, logout } from "@/redux/features/userProfile";

const Layout = (props: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const { children } = props;
  const router = useRouter();

  /**
   * 用于验证账号存活性 预计使用 swr 替换
   */
  useEffect(() => {
    if (!localStorage.getItem("Token")) router.replace("/");
    else
      getUserInfo()
        .then(
          (res) => {
            if (res.data.Success) {
              const data = res.data.Data;
              dispatch(login({ username: data.email, email: data.email }));
            } else {
              localStorage.removeItem("Token");
              router.replace("/");
            }
          },
          (err) => {
            router.replace("/");
          }
        )
        .catch();
  });

  return (
    <>
      Hello, {children}
      <div>
        <button
          onClick={() => {
            router.replace("/");
            dispatch(logout());
          }}
        >
          退出登錄
        </button>
      </div>
    </>
  );
};

export default Layout;
