"use client";

import { getUserProfile } from "@/lib/apis/user";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import { useEffect } from "react";

const Home = () => {
  return (
    <Suspense fallback={<h1>数据加载中...</h1>}>
      <></>
    </Suspense>
  );
};

export default Home;
