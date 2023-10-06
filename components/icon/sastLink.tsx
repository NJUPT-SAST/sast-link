import logo from "@public/svg/logo/logo.svg";
import sastlink from "@public/svg/logo/SASTLink.svg";
import classNames from "classnames";
import Image from "next/image";
import styles from "./index.module.scss";

const Logo = () => {
  return (
    <div className={classNames(styles.logo)}>
      <Image src={logo} alt="sast link logo" width={24} height={24} />
      <Image src={sastlink} alt="sast link" />
    </div>
  );
};

export { Logo };
