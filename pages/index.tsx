import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import styles from "@/styles/Home.module.scss";
import { MemorizedAccountItem } from "@/components/accountItem";
import { Button } from "@/components/button";
import { A } from "@/components/a";
import { Layout } from "@/components/Layout";
import BackLayout from "@/components/Layout/BackLayout";

const Home = () => {
  const router = useRouter();
  const [selected, setSelected] = useState<number>(0);
  const changeFocus = useCallback((item: number) => {
    setSelected(item);
  }, []);

  useEffect(() => {
    if (false) {
      router.replace("/login", undefined, { shallow: true });
    }
  }, [router]);

  const Item = [
    {
      nickName: " Ming",
      mail: "B21000000@njupt.edu.cn",
    },
    {
      nickName: " Ming",
      mail: "B21000001@njupt.edu.cn",
    },
    {
      nickName: " Ming",
      mail: "B21000002@njupt.edu.cn",
    },
    {
      nickName: " Ming",
      mail: "B21000003@njupt.edu.cn",
    },
    {
      nickName: " Ming",
      mail: "B21000004@njupt.edu.cn",
    },
    {
      nickName: " Ming",
      mail: "B21000005@njupt.edu.cn",
    },
  ];

  return (
    <>
      <BackLayout type="green" />
      <Layout title={"<sast link>"}>
        <div className={styles.accountList}>
          <div className={styles.scroll}>
            {Item.map((value, index) => {
              return (
                <MemorizedAccountItem
                  index={index}
                  selected={index === selected}
                  key={`${value.mail}_${value.nickName}`}
                  nickName={`${value.nickName}`}
                  mail={`${value.mail}`}
                  onFocus={changeFocus}
                />
              );
            })}
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
