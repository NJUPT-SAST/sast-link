"use client";

import { getUserProfile } from "@/lib/apis/user";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import { useEffect } from "react";
import styles from "./page.module.scss";
import { MagicCard } from "@/components/magicui/magic-card";
import classNames from "classnames";
import Image from "next/image";
import aprove from "@public/svg/app-logo/aprove.svg";
import fc from "@public/svg/app-logo/fc.svg";
import seeing from "@public/svg/sastimage.svg";
import evento from "@public/svg/app-logo/evento.svg";
import Link from "next/link";

const Home = () => {
  return (
    <Suspense fallback={<h1>数据加载中...</h1>}>
      <div className={styles.settingPanelListLayout}>
        <h2 className={styles.title}>应用</h2>
        <div className="grid grid-cols-2 gap-3 *:cursor-pointer *:select-none">
          <Link href="https://approve.sast.fun">
            <MagicCard className="p-4 grid place-content-center">
              <div className="flex flex-col gap-2 items-center">
                <Image
                  width={32}
                  height={32}
                  src={aprove}
                  alt={"approve system"}
                />
                <span className={styles.appName}>审批系统</span>
              </div>
            </MagicCard>
          </Link>
          <Link href="https://fc.sast.fun">
            <MagicCard className="p-4 grid place-content-center">
              <div className="flex flex-col gap-2 items-center">
                <Image src={fc} alt={"approve system"} />
                <span className={styles.appName}>SASTOJ</span>
              </div>
            </MagicCard>
          </Link>
          <Link href="https://sastimg.mxte.cc">
            <MagicCard className="p-4 grid place-content-center">
              <div className="flex flex-col gap-2 items-center">
                <Image src={seeing} alt={"approve system"} />
                <span className={styles.appName}>视觉科协</span>
              </div>
            </MagicCard>
          </Link>
          <Link href="https://evento.sast.fun">
            <MagicCard className="p-4 grid place-content-center">
              <div className="flex flex-col gap-2 items-center">
                <Image src={evento} alt={"approve system"} />
                <span className={styles.appName}>SAST Evento</span>
              </div>
            </MagicCard>
          </Link>
        </div>
      </div>
    </Suspense>
  );
};

export default Home;
