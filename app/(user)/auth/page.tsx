"use client";
import { Button } from "@/components/button";
import { Anchor } from "@/components/anchor";
import { Layout } from "@/components/Layout";
import BackLayout from "@/components/Layout/BackLayout";
import { Footer } from "@/components/footer";
import { useSearchParams } from "next/navigation";
import styles from "./page.module.scss";
import Image from "next/image";
import defaultAvatar from "@/public/defaultAvator.png";
import useSWR from "swr";
import { getUserInfo } from "@/lib/apis/user";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const getMessage = async () => {
  if (!localStorage.getItem("Token"))
    return { Success: false, Data: { username: "", email: "" } };
  const info = await getUserInfo();
  console.log(info);
  return info.data;
};

export default function Auth() {
  const {
    data: { Success, Data },
  } = useSWR("infoUpdate", getMessage, { suspense: true });
  // 获取参数
  console.log(Success);
  const router = useRouter();
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

  useEffect(() => {
    if (!Success) router.push(`./login?redirect=${redirect}`);
    // TODO
    // 检验， 若参数不合法，则抛出错误
  }, [Success, router, redirect]);
  return (
    <>
      <BackLayout type="green" />
      {
        // TODO
        // 熟悉 oAuth 流程，根据 路由参数执行正确命令
      }
      <Layout>
        <div className={"pageTitle"}>{"<sast link>"}</div>
        <div className={"globalContainer"}>
          <div className={styles.authPanel}>
            <div className={styles.both}>
              <div className={styles.userMessage}>
                <Image
                  alt="avatar"
                  src={defaultAvatar}
                  width={80}
                  height={80}
                ></Image>
                <div className={styles.username}>{"Ming"}</div>
              </div>
              <div className={styles.clientMessage}>
                <Image
                  alt="avatar"
                  src={defaultAvatar}
                  width={80}
                  height={80}
                ></Image>
                <div className={styles.username}>{"SAST Evento"}</div>
              </div>
            </div>

            {/* <div className={styles.email}>{Data.email}</div> */}
            <ul className={styles.list}>
              <li>获取用户头像、信息</li>
              <li>获取其他信息</li>
            </ul>
          </div>
          <Footer>
            <Button>授权</Button>
            <Anchor href={`/login?redirect=${redirect}`}>使用其他账号</Anchor>
          </Footer>
        </div>
      </Layout>
    </>
  );
}
