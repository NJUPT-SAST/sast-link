"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUserProfile } from "@/lib/apis/user";
import { useAppDispatch } from "@/redux";
import { login } from "@/redux/features/userProfile";
import { updateAccount } from "@/redux/features/userList";
import { setUserBasicInfo } from "@/redux/features/userBasicInfo";
import useSWR from "swr";

const GetInfo = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data, isLoading } = useSWR("getProfile", () =>
    getUserProfile().then((res) => {
      if (res.data.Success === true) {
        const data = res.data.Data;
        dispatch(setUserBasicInfo(data));
        dispatch(login({ username: data.nickname, email: data.email }));
        dispatch(
          updateAccount({
            nickname: data.nickname,
            email: data.email,
            avater: data.avatar,
          }),
        );
      } else router.replace("/login");
    }),
  );
  useEffect(() => {
    if (localStorage.getItem("Token") === null) {
      return router.replace("/login");
    }
    // getUserProfile().then((res) => {
    //   if (res.data.Success === true) {
    //     dispatch(setUserBasicInfo(res.data.Data));
    //   } else router.replace("/login");
    // });
  }, [dispatch, router]);
  return <></>;
};

export default GetInfo;
