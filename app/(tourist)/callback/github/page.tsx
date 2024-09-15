"use client";
import { getGithubLoginStatus } from "@/lib/apis/global";
import { getUserInfo } from "@/lib/apis/user";
import { useAppDispatch } from "@/redux";
import { addAccount } from "@/redux/features/userList";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from "./page.module.scss";
import { Player } from "@lottiefiles/react-lottie-player";
import BackLayout from "@/components/Layout/BackLayout";

const GithubCallback = ({
  searchParams,
}: {
  searchParams: {
    code: string;
    state: string;
  };
}) => {
  const { code, state } = searchParams;
  const router = useRouter();
  const dispatch = useAppDispatch();

  console.log("code", code, "state", state);

  useEffect(() => {
    getGithubLoginStatus(code, state).then((githubRes) => {
      if (githubRes.data.success) {
        localStorage.setItem(
          "Token",
          JSON.stringify(githubRes.data.data.loginToken),
        );
        getUserInfo().then((res) => {
          if (res.data.success) {
            const data = res.data.data;
            dispatch(
              addAccount({
                nickName: "ming",
                email: data.email,
                Token: githubRes.data.data.loginToken,
                userId: data.userId,
              }),
            );

            router.replace("/home");
          }
        });
      } else {
        if (githubRes.data.err_code === 50000) {
          return <div>Github 登录失败</div>;
        }
        router.replace(`/login?oauthTicket=${githubRes.data.data.oauthTicket}`);
      }
    });
  }, [code, dispatch, router, state]);

  return (
    <div className={styles["base"]}>
      <BackLayout type="green" />
      <div className={styles["wrap"]}>
        {/* <Icon iconNode={cupSaucer} size={48} strokeWidth={1.25} /> */}
        <Player
          autoplay={true}
          loop={false}
          src="/svg/done.json"
          style={{ height: "64px", width: "64px" }}
          keepLastFrame
          renderer="svg"
        />
        <div className={styles["text"]}>授权成功，正在重定向</div>
      </div>
    </div>
  );
};

export default GithubCallback;
