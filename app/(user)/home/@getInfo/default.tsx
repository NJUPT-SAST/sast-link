"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUserProfile } from "@/lib/apis/user";
import { useAppDispatch } from "@/redux";
import { setUserBasicInfo } from "@/redux/features/userBasicInfo";

const GetInfo = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (localStorage.getItem("Token") === null) {
      return router.replace("/login");
    }
    getUserProfile().then((res) => {
      if (res.data.Success === true) {
        dispatch(setUserBasicInfo(res.data.Data));
      } else router.replace("/login");
    });
  }, [dispatch, router]);
  return <></>;
};

export default GetInfo;
