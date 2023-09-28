"use client";

import { Player } from "@lottiefiles/react-lottie-player";
import { CenterArrow } from "@/components/icon/ArrowIcon";
import { Footer } from "@/components/footer";
import { Anchor } from "@/components/anchor";
import styles from "./page.module.scss";
import { useContext } from "react";
import { ResetContext } from "@/lib/context";

const ResetStep4 = () => {
  const { redirect } = useContext(ResetContext);
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
          <span>重置成功</span>
        </div>
        <Footer>
          <Anchor black href={`/login${href}`}>
            前往登录界面
            <CenterArrow />
          </Anchor>
        </Footer>
      </div>
    </>
  );
};

export { ResetStep4 };
