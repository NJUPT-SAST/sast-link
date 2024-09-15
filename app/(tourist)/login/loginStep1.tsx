"use client";

import { Form } from "@/components/form";
import { useRef, useState, useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux";
import { addLoginTicket } from "@/redux/features/login";
import { veriLoginAccount } from "@/lib/apis/global";
import { Button } from "@/components/button";
import { InputWithLabel } from "@/components/input/inputWithLabel";
import { handleError } from "@/lib/func";
import Link from "next/link";
import { Anchor } from "@/components/anchor";
import { OtherLoginList } from "@/components/list/otherLoginList";
import { GithubIcon, QqIcon, MsIcon } from "@/components/icon";
import { useRouter, useSearchParams } from "next/navigation";

import styles from "./page.module.scss";
import classNames from "classnames";
import PageTransition from "@/components/pageTransition";
import { message } from "@/components/message";

const list = [
  {
    target: `/apis/user/loginWithSSO/?redirect_url=${window.location.protocol}//${window.location.host}/callback/github&idp=github&code=123`,
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

const LoginStep1 = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { redirect } = useAppSelector((state) => state.loginMessage);
  const urlParams = useSearchParams();
  const [error, setError] = useState<
    { error: false } | { error: true; errMsg: string }
  >({ error: false });

  const veridate = useCallback((value: string) => {
    if (value === "") {
      return "用户名不可为空";
    }
    return false;
  }, []);

  useEffect(() => {
    if (urlParams.get("oauthTicket")) {
      message.warning("请先绑定账号");
    }
  }, [urlParams]);

  /**
   * 输入账号，点击登录后进入判断，验证账号存在性，存储返回信息
   */
  return (
    <>
      <PageTransition className={styles.formLayout}>
        <Form
          className={[`${styles.nameForm}`]}
          names={["username"]}
          onSubmit={(args) => {
            setLoading(true);
            const username = args.username as string;
            veriLoginAccount(username)
              .then((res) => {
                console.log(res);
                if (res.data.success) {
                  const ticket = res.data.data['login-ticket'];
                  dispatch(addLoginTicket(ticket));
                  router.replace(
                    `/login/2${
                      urlParams.get("redirect")
                        ? `?redirect=${urlParams.get("redirect")}`
                        : ""
                    }${
                      urlParams.get("oauthTicket")
                        ? `?oauthTicket=${urlParams.get("oauthTicket")}`
                        : ""
                    }`,
                  );
                  return;
                }
                setError({ error: true, errMsg: res.data.err_msg });
              })
              .catch()
              .finally(() => {
                setLoading(false);
              });
          }}
        >
          <div className="w-full">
            <InputWithLabel
              setErrorState={setError}
              veridate={veridate}
              ref={inputRef}
              label="账户"
              name="username"
              error={error}
              palceholder="学号或邮箱"
            />
            <div className={styles.resetPwdContainer}>
              <Link href={"/reset"} className={styles.resetPwd}>
                忘记密码
              </Link>
            </div>
          </div>

          <Button
            loading={loading}
            onClick={(e) => {
              // biome-ignore lint/style/noNonNullAssertion: <explanation>
              const check = veridate(inputRef.current!.value);
              if (check) {
                setError(handleError(check));
                e.preventDefault();
                return;
              }
            }}
            className={classNames(styles.formButton)}
            type={"submit"}
          >
            {urlParams.get("oauthTicket") ? "绑定账号" : "下一步"}
          </Button>
        </Form>
        {!urlParams.get("oauthTicket") && (
          <>
            <Anchor
              href={`/apis/login/lark?redirect_url=${window.location.protocol}//${window.location.host}/callback/feishu`}
              className={classNames(styles.anchor)}
            >
              SAST 飞书登录
            </Anchor>
            <OtherLoginList list={list} />
          </>
        )}
        <div className={`${styles.toRegist}`}>
          没有账号？
          <Link href={`/regist${redirect ? `?redirect=${redirect}` : ""}`}>
            注册
          </Link>
        </div>
      </PageTransition>
    </>
  );
};

export default LoginStep1;
