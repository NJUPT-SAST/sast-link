"use client";
import { handleError } from "@/components/function";
import { getFeishuLoginStatus } from "@/lib/apis/global";
import { getUserInfo } from "@/lib/apis/user";
import { useAppDispatch } from "@/redux";
import { addAccount } from "@/redux/features/userList";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from "./page.module.scss";
import { cupSaucer } from "@lucide/lab";
import { Icon } from "lucide-react";
import { Player } from "@lottiefiles/react-lottie-player";
import BackLayout from "@/components/Layout/BackLayout";

const FeishuCallback = ({
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
    getFeishuLoginStatus(code, state).then((feishuRes) => {
      if (feishuRes.data.Success) {
        localStorage.setItem(
          "Token",
          JSON.stringify(feishuRes.data.Data.loginToken),
        );
        getUserInfo().then((res) => {
          if (res.data.Success) {
            const data = res.data.Data;
            dispatch(
              addAccount({
                nickName: "ming",
                email: data.email,
                Token: feishuRes.data.Data.loginToken,
                userId: data.userId,
              }),
            );

            router.replace("/home");
          }
        });
      } else {
        if (feishuRes.data.ErrCode === 50000) {
          return <div>飞书登录失败</div>;
        }
        router.replace(`/login?oauthTicket=${feishuRes.data.Data.oauthTicket}`);
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

export default FeishuCallback;
