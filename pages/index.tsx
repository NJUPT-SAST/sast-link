import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "@/styles/Home.module.scss";
import { AccountItem } from "@/components/accountItem";
import { Button } from "@/components/button";
import { A } from "@/components/a";
import { Layout } from "@/components/Layout";
import BackLayout from "@/components/Layout/BackLayout";


const Home = () => {
  const router = useRouter();

  useEffect(() => {
    if (false) {
      router.replace("/login", undefined, { shallow: true });
    }
  }, [router]);

  return (
    <>
      {/* <BackLayout /> */}
      <Layout title={"<sast link>"}>
        <div className={styles.accountList}>
          <div className={styles.scroll}>
            <AccountItem />
            <AccountItem />
            <AccountItem />
            <AccountItem />
            <AccountItem />
            <AccountItem />
          </div>
        </div>
        <div className={styles.footer}>
          <Button>登录</Button>
          <A href="/login">使用其他账号</A>
        </div>
      </Layout>
    </>
  );
};

export default Home;
