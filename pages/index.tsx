import { Input } from "@/components/input";
import { Button, NextButton } from "@/components/button";
import { A } from "@/components/a";
import { AccountItem } from "@/components/accountItem";
import { GithubIcon, QqIcon, MsIcon } from "@/components/icon";
import classNames from "classnames";
import styles from "@/styles/Home.module.scss";
import { Form } from "@/components/form";
import Link from "next/link";
import BackLayout from "@/components/Layout/BackLayout";

export default function Home() {
  return (
    <>
      <BackLayout className={[styles.layout]}>
        <div className={`${styles.title}`}>{"<sast  link>"}</div>
        <div className={`${styles.container}`}>
          <Form
            className={[`${styles.form}`]}
            names={["username"]}
            onSubmit={(args) => {
              console.log(args);
            }}
          >
            <Input className={[styles.input]} name={`username`} placeholder={`用户名或邮箱`} />
            <Button className={[styles.formButton]} type={"submit"}>
              登录
            </Button>
          </Form>
          <A href="a" className={[styles.anchor]}>
            SAST 飞书登录
          </A>
          <div className={`${styles.icons}`}>
            <a>
              <GithubIcon />{" "}
            </a>
            <a>
              <QqIcon />
            </a>
            <a>
              <MsIcon />
            </a>
          </div>
          <div className={`${styles.toRegist}`}>
            没有账号？<Link href={""}>注册</Link>
          </div>
        </div>
      </BackLayout>
    </>
  );
}
