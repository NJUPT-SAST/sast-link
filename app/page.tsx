"use client";

import { Button } from "@/components/button";
import { Anchor } from "@/components/anchor";
import { Layout } from "@/components/Layout";
import BackLayout from "@/components/Layout/BackLayout";
import { AccountPanel } from "@/components/accountPanel";
import { Footer } from "@/components/footer";
import { createContext, useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux";
import { useRouter } from "next/navigation";
import { login } from "@/redux/features/userProfile";
import { getUserInfo } from "@/lib/apis/user";
import { SelectedAccountContext } from "@/lib/context";
import { message } from "@/components/message";

export default function Home() {
  const dispatch = useAppDispatch();
  const localUserList = useAppSelector((state) => state.localUserList);
  const router = useRouter();
  const [selected, setSelected] = useState(0);
  const handleSelected = (index: number) => {
    setSelected(index);
  };

  useEffect(() => {
    // 若不存在已认证帐号，则跳转至登陆界面。
    if (
      !localStorage.getItem("userList") ||
      localStorage.getItem("userList") === "[]"
    )
      router.replace("/login");
  }, [localUserList, router]);

  return (
    <>
      <BackLayout type="green" />
      <Layout>
        <div className={"pageTitle"}>{"<sast link>"}</div>
        <div className={"globalContainer"}>
          <SelectedAccountContext.Provider
            value={{ selected, setSelected: handleSelected }}
          >
            <AccountPanel />
          </SelectedAccountContext.Provider>
          <Footer>
            <Button
              onClick={(e) => {
                localStorage.setItem(
                  "Token",
                  JSON.stringify(localUserList[selected].Token),
                );
                getUserInfo().then((res) => {
                  if (res.data.success) {
                    router.replace("/home");
                    return;
                  }

                  // TODO error
                  //如果失败了，说明选中的用户的token过期了，应该移除当前的token以及更新转到登陆页面
                  //该用户的userList
                  message.error("该用户的验证消息已过期，请重新登录!");
                });
              }}
            >
              登录
            </Button>
            <Anchor href="/login">使用其他账号</Anchor>
          </Footer>
        </div>
      </Layout>
    </>
  );
}
