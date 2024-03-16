"use client";

import styles from "./page.module.scss";
import classNames from "classnames";
import vector from "@public/svg/Vector.svg";
import Image from "next/image";
import aprove from "@public/svg/app-logo/aprove.svg";
import fc from "@public/svg/app-logo/fc.svg";
import seeing from "@public/svg/app-logo/seeing.svg";
import evento from "@public/svg/app-logo/evento.svg";
import { useAppDispatch, useAppSelector } from "@/redux";
import { handleHomeAppPanel } from "@/redux/features/panelState";
import { message } from "@/components/message";

const AppPanel = () => {
  const appPanelState = useAppSelector(
    (state) => state.panelState.homeAppPanel,
  );
  const dipatch = useAppDispatch();
  return (
    <>
      <div
        onClick={() => dipatch(handleHomeAppPanel(false))}
        className={classNames(styles.musk, {
          [styles.muskHidden]: !appPanelState,
        })}
      />
      <div
        className={classNames(styles.appPanel, {
          [styles.appPanelHidden]: !appPanelState,
        })}
      >
        <Image
          className={styles.closeIcon}
          onClick={() => dipatch(handleHomeAppPanel(false))}
          src={vector}
          alt="close icon"
          height={16}
          width={16}
        />
        <div className={classNames(styles.PanelTitle)}>应用</div>
        <div className={classNames(styles.appList)}>
          <div
            onClick={() => {
              message.warning("暂未开放");
            }}
            className={classNames(styles.appItem)}
          >
            <div className={classNames(styles.appLogo)}>
              <Image src={aprove} alt={"approve system"} />
            </div>

            <span className={styles.appName}>审批系统</span>
          </div>
          <div
            onClick={() => {
              message.warning("暂未开放");
            }}
            className={classNames(styles.appItem)}
          >
            <div className={classNames(styles.appLogo)}>
              <Image src={fc} alt={"fresh cup"} />
            </div>
            <span className={styles.appName}>新柚杯</span>
          </div>
          <div
            onClick={() => {
              message.warning("暂未开放");
            }}
            className={classNames(styles.appItem)}
          >
            <div className={classNames(styles.appLogo)}>
              <Image src={seeing} alt={"seeing sast"} />
            </div>
            <span className={styles.appName}>视觉科协</span>
          </div>
          <div
            onClick={() => {
              message.warning("暂未开放");
            }}
            className={classNames(styles.appItem)}
          >
            <div className={classNames(styles.appLogo)}>
              <Image src={evento} alt={"evento"} />
            </div>
            <span className={styles.appName}>Evento</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppPanel;
