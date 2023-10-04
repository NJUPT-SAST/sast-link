import menu from "@public/svg/menu.svg";
import Image from "next/image";
import styles from "./index.module.scss";

const MenuIcon = () => {
  return <Image src={menu} alt="menu icon" height={24} width={24} />;
};

export { MenuIcon };
