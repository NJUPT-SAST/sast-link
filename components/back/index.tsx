"use client";
import { useRouter } from "next/navigation";
import { Icon, arrowheadIcon } from "../icon";
import styles from "./index.module.scss";
const Back = () => {
  const route = useRouter();
  return (
    <div
      onClick={() => {
        route.back();
      }}
      className={styles.backBody}
    >
      <Icon style={{ transform: "rotateY(180deg)" }} {...arrowheadIcon} />
      Back
    </div>
  );
};

export default Back;
