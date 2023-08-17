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

export const SelectedAccountContext = createContext({
  selected: 0,
  setSelected: (index: number) => {},
});

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
                // 此处应该为根据已知信息发送请求，获取账号信息，若账号通过验证，则登录，若未通过
                // 则跳转至输入密码界面
                console.log(123);
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
