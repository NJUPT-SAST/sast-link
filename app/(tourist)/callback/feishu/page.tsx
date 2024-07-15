"use client";
import { handleError } from "@/components/function";
import { getFeishuLoginStatus } from "@/lib/apis/global";
import { getUserInfo } from "@/lib/apis/user";
import { useAppDispatch } from "@/redux";
import { addAccount } from "@/redux/features/userList";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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
      console.log(feishuRes);
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
        console.log("跳转");
        router.replace(`/login?oauthTicket=${feishuRes.data.Data.oauthTicket}`);
      }
    });
  }, [code, dispatch, router, state]);

  return (
    <>
      <div>正在重定向</div>
    </>
  );
};

export default FeishuCallback;
