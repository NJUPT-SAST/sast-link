"use client";
import { Button } from "@/components/button";
import { Anchor } from "@/components/anchor";
import { Layout } from "@/components/Layout";
import BackLayout from "@/components/Layout/BackLayout";
import { AccountPanel } from "@/components/accountPanel";
import { Footer } from "@/components/footer";
import { useSearchParams } from "next/navigation";

export default function Auth() {
  // 获取参数
  const searchParams = useSearchParams();
  const querys: {
    client_id: null | string;
    code_challenge: null | string;
    code_challenge_method: null | string;
    redirect_url: null | string;
    response_type: null | string;
    scope: null | string;
    state: null | string;
  } = {
    client_id: null,
    code_challenge: null,
    code_challenge_method: null,
    redirect_url: null,
    response_type: null,
    scope: null,
    state: null,
  };

  const querysArray = Object.keys(querys).map((key) => {
    (querys as any)[key] = searchParams.get(key);
    return `${key}=${searchParams.get(key)}`;
  });
  const redirect = `/auth?${querysArray.join("&")}`;
  // TODO
  // 若当前未登录，则直接跳转至login。
  return (
    <>
      <BackLayout type="green" />
      <Layout>
        <div className={"pageTitle"}>{"<sast link>"}</div>
        <div className={"globalContainer"}>
          <AccountPanel />
          <Footer>
            <Button>授权</Button>
            <Anchor href={`/login?redirect=${redirect}`}>使用其他账号</Anchor>
          </Footer>
        </div>
      </Layout>
    </>
  );
}
