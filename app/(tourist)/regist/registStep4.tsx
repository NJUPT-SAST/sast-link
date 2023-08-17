"use client";

import { Player } from "@lottiefiles/react-lottie-player";
import { CenterArrow } from "@/components/icon/ArrowIcon";
import { Footer } from "@/components/footer";
import { Anchor } from "@/components/anchor";
import styles from "./page.module.scss";
import { useContext } from "react";
import { RegistContext } from "./page";

const RegistStep4 = () => {
  const { redirect } = useContext(RegistContext);
  const href = redirect ? `?redirect=${redirect}` : "";
  return (
    <>
      <div className={`${styles.complete}`}>
        <div className={`${styles.success}`}>
          <Player
            autoplay={true}
            loop={false}
            src="https://assets5.lottiefiles.com/packages/lf20_svaw8skx.json"
            style={{ height: "200px", width: "200px" }}
            keepLastFrame
            renderer="svg"
          />
          <span>注册成功</span>
        </div>
        <Footer>
          <Anchor black href={`/login${href}`}>
            返回登录
            <CenterArrow />
          </Anchor>
        </Footer>
      </div>
    </>
  );
};

export { RegistStep4 };
