"use client";

import { useRouter } from "next/navigation";
import useSWR from "swr";
import { getUserInfo } from "@/lib/apis/user";
import { Suspense } from "react";
import classNames from "classnames";

import styles from "./page.module.scss";
import avatar from "@public/defaultAvator.png";
import {
  qqIcon,
  githubIcon,
  msIcon,
  feishuIcon,
  blackArrowheadIcon,
} from "@/components/icon";
import { Icon } from "@/components/icon";
import { BindAppItem } from "@/components/bindItem";
import Link from "next/link";

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
  return (
    <Suspense fallback={<h1>数据加载中...</h1>}>
      <></>
    </Suspense>
  );
};

export default Home;
