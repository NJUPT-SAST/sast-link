"use client";
import classNames from "classnames";
import styles from "./index.module.scss";
import { useAppDispatch, useAppSelector } from "@/redux";
import {
  handleHomeAppPanel,
  handleHomeInfoPanel,
} from "@/redux/features/panelState";
import { Logo, MenuIcon } from "../icon";
import Image from "next/image";
import avatar from "@public/defaultAvatar.png";

const TopBar = () => {
  const dispatch = useAppDispatch();
  const userBasicInfo = useAppSelector((state) => state.userBasicInfo);
  return (
    <>
      <div className={classNames(styles.topbar)}>
        <div
          onClick={() => {
            dispatch(handleHomeAppPanel(true));
          }}
          className={classNames(styles.menuIcon)}
        >
          <MenuIcon />
        </div>
        <Logo />
        <div className={classNames(styles.avatar)}>
          <Image
            onClick={() => {
              dispatch(handleHomeInfoPanel(true));
            }}
            style={{ objectFit: "cover" }}
            src={userBasicInfo.avatar ?? avatar}
            alt="avatar"
            width={36}
            height={36}
          />
        </div>
      </div>
      <div className={classNames(styles.placeholder)} />
    </>
  );
};

export { TopBar };
