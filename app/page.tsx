import styles from "./page.module.scss";
// import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/button";
import { Anchor } from "@/components/anchor";
import { Layout } from "@/components/Layout";
import BackLayout from "@/components/Layout/BackLayout";
import { AccountPanel } from "@/components/accountPanel";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <BackLayout type="green" />
      <Layout>
      <div className={"pageTitle"}>{"<sast link>"}</div>
      <div className={"globalContainer"}>
        <AccountPanel />
        <Footer>
          <Button>登录</Button>
          <Anchor href="/login">使用其他账号</Anchor>
        </Footer>
        </div>
      </Layout>
    </>
  );
}
