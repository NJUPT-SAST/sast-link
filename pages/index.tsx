import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/button";
import { A } from "@/components/a";
import { Layout } from "@/components/Layout";
import BackLayout from "@/components/Layout/BackLayout";
import { Footer } from "@/components/footer";
import { useAppSelector } from "@/redux";

const AccountList = dynamic(
  () => import("@/components/list/accountList").then((mod) => mod.AccountList),
  { ssr: false },
);

const Home = () => {
  const router = useRouter();
  const localUserList = useAppSelector((state) => state.localUserList);
  const [selected, setSelected] = useState<number>(0);
  const changeFocus = useCallback((item: number) => {
    setSelected(item);
  }, []);

  useEffect(() => {
    if (localUserList.length === 0) {
      router.replace("/login", undefined, { shallow: true });
    }
  }, [router, localUserList]);

  return (
    <>
      <BackLayout type="green" />
      <Layout title={"<sast link>"}>
        <AccountList
          accountList={localUserList}
          changeFocus={changeFocus}
          selected={selected}
        />
        <Footer>
          <Button>登录</Button>
          <A href="/login">使用其他账号</A>
        </Footer>
      </Layout>
    </>
  );
};

export default Home;
