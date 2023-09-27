"use client";

import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux";
import { logout } from "@/redux/features/userProfile";
import useSWR from "swr";
import { getUserInfo } from "@/lib/apis/user";
import { Suspense, useEffect } from "react";
import { removeAccount } from "@/redux/features/userList";

const getMessage = async () => {
  if (!localStorage.getItem("Token"))
    return { Success: false, Data: { username: "", email: "" } };
  const info = await getUserInfo();
  console.log(info);
  return info.data;
};

const Home = () => {
  const {
    data: { Success, Data },
  } = useSWR("infoUpdate", getMessage, { suspense: true });
  const router = useRouter();
  const dispatch = useAppDispatch();
  // const userProfile = useAppSelector((state) => state.currentUserProfile);
  useEffect(() => {
    if (!Success) {
      router.replace("./");
    }
  }, [Success, router]);
  return (
    <Suspense fallback={<h1>数据加载中...</h1>}>
      <>
        Hello, {Data?.email}, You have logged!
        <div>
          <button
            onClick={() => {
              if (Data !== null) {
                router.replace("/");
                dispatch(logout());
                dispatch(removeAccount(Data.email));
              }
            }}
          >
            退出登錄
          </button>
        </div>
      </>
    </Suspense>
  );
};

export default Home;
