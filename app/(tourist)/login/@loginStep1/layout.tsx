import { Anchor } from "@/components/anchor";
import { OtherLoginList } from "@/components/list/otherLoginList";
import { GithubIcon, QqIcon, MsIcon } from "@/components/icon";
import Link from "next/link";
import styles from "./page.module.scss";
import { ReactNode } from "react";

const list = [
  {
    target: "",
    describe: "Github",
    icon: <GithubIcon />,
  },
  {
    target: "",
    describe: "QQ",
    icon: <QqIcon />,
  },
  {
    target: "",
    describe: "Microsoft",
    icon: <MsIcon />,
  },
];

const Layout = (props: { children: ReactNode }) => {
  const { children } = props;
  return (
    <>
      {children}
      <Anchor href="a" className={[styles.anchor]}>
        SAST 飞书登录
      </Anchor>
      <OtherLoginList list={list} />
      <div className={`${styles.toRegist}`}>
        没有账号？<Link href={"/regist"}>注册</Link>
      </div>
    </>
  );
};

export default Layout;
