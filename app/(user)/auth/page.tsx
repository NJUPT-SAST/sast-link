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
import { getUserInfo } from "@/lib/apis/user";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { oAuth } from "@/lib/apis/auth";

export default function Auth() {
  // TODO
  const appName = "SAST Evento";
  const [userData, setUserData] = useState<{ email: string; userId: string }>();
  // 获取参数
  const router = useRouter();
  const searchParams = useSearchParams();
  const querys: {
    client_id: null | string;
    code_challenge: null | string;
    code_challenge_method: null | string;
    redirect_uri: null | string;
    response_type: null | string;
    scope: null | string;
    state: null | string;
  } = {
    client_id: null,
    code_challenge: null,
    code_challenge_method: null,
    redirect_uri: null,
    response_type: null,
    scope: null,
    state: null,
  };

  const querysArray = Object.keys(querys).map((key) => {
    (querys as any)[key] = searchParams.get(key);
    return `${key}=${searchParams.get(key)}`;
  });
  const redirect = `/auth?${JSON.stringify(querysArray)}`;
  useEffect(
    () => {
      if (localStorage.getItem("Token") === null) {
        router.replace(`/login?redirect=${redirect}`);
      } else {
        getUserInfo().then((res) => {
          if (res.data.Success === true) {
            setUserData({ ...res.data.Data });
          } else {
            router.replace(`/login?redirect=${redirect}`);
          }
        });
      }
    },
    // TODO
    // token 校验出错时 重定向
    // TODO
    // 检验， 若参数不合法，则抛出错误
  );
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
              </div>
              <div className={styles.svgContainer}>
                <svg
                  aria-hidden="true"
                  height="16"
                  viewBox="0 0 16 16"
                  version="1.1"
                  width="16"
                  data-view-component="true"
                  className={styles.svg}
                >
                  <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"></path>
                </svg>
              </div>
              <div className={styles.clientMessage}>
                <Image
                  alt="avatar"
                  src={defaultAvatar}
                  width={80}
                  height={80}
                ></Image>
              </div>
            </div>
            <div className={styles.authList}>
              <div className={styles.authDescription}>
                {
                  // TODO 获取 appName 并指向争取的url
                }
                授权后，<a>{appName}</a> 将获得您的以下信息：
              </div>
              {/* <div className={styles.email}>{Data.email}</div> */}
              <ul className={styles.list}>
                <li>获取您的基本信息</li>
                <li>获取账户的近期活动</li>
                <li>获取其他信息</li>
              </ul>
            </div>
          </div>
          <Footer>
            <Button
              onClick={() => {
                oAuth(querys);
              }}
            >
              授权
            </Button>
            <Anchor href={`/login?redirect=${redirect}`}>使用其他账号</Anchor>
          </Footer>
        </div>
      </Layout>
    </>
  );
}
