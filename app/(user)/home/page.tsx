"use client";

import { useAppSelector } from "@/redux";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux";
import { login, logout } from "@/redux/features/userProfile";
import useSWR from "swr";
import { getUserInfo } from "@/lib/apis/user";
import { useEffect } from "react";

const getMessage = async () => {
  if (!localStorage.getItem("Token"))
    return { Success: false, Data: { username: "", email: "" } };
  const info = await getUserInfo();
  console.log(info);
  return info.data;
};

const Home = () => {
  const {
    data: { Success, Data }
  } = useSWR("infoUpdate", getMessage, { suspense: true });
  const router = useRouter();
  const dispatch = useAppDispatch();
  const userProfile = useAppSelector((state) => state.currentUserProfile);
  useEffect(() => {
    if (!Success) {
      router.replace("./");
    }
  }, [Success, router]);
  return (
    <>
      Hello, {Data.email}, You have logged!
      <div>
        <button
          onClick={() => {
            router.replace("/");
            dispatch(logout());
          }}
        >
          退出登錄
        </button>
      </div>
    </>
  );
};

export default Home;
