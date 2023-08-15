"use client";
import { useCallback, useEffect, useRef } from "react";
import { MemorizedAccountItem } from "../accountItem";
import styles from "./index.module.scss";
import { useAppSelector } from "@/redux";
import { useAppDispatch } from "@/redux";
import { useState } from "react";
import { removeAccount } from "@/redux/features/userList";
import { useRouter } from "next/navigation";

const AccountList = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const localUserList = useAppSelector((state) => state.localUserList);
  const [selected, setSelected] = useState<number>(0);
  const dispatch = useAppDispatch();
  const changeFocus = useCallback((index: number) => {
    setSelected(index);
  }, []);

  const scroll = useCallback((index: number) => {
    scrollRef.current!.scroll({ top: index * 80, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (
      !localStorage.getItem("userList") ||
      localStorage.getItem("userList") === "[]"
    )
      router.replace("/login");
  }, [localUserList, router]);
  return (
    <>
      <div className={styles.accountList}>
        <div className={styles.scroll} ref={scrollRef}>
          <div className={styles.topWhite} />
          {localUserList.map((value, index) => {
            return (
              <MemorizedAccountItem
                index={index}
                selected={index === selected}
                key={`${value.email}_${value.nickName}`}
                nickName={`${value.nickName}`}
                mail={`${value.email}`}
                onFocus={() => {
                  changeFocus(index);
                  scroll(index);
                }}
                onClose={() => {
                  dispatch(removeAccount(index));
                }}
              />
            );
          })}
          <div className={styles.bottomWhite} />
        </div>
      </div>
    </>
  );
};

export { AccountList };
