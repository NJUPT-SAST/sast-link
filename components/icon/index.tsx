import styles from "./index.module.scss";
import classNames from "classnames";
import Image from "next/image";

import type { StaticImageData } from "next/image";

interface CenterIconProps {
  src: string | StaticImageData;
  alt: string;
  className?: (string | { [key: string]: boolean })[];
}

const CenterIcon = (props: CenterIconProps) => {
  const { src, alt, className = [] } = props;
  return (
    <>
      <div className={`${styles.icon} ${classNames(...className)}`}>
        <Image src={src} alt={alt} />
      </div>
    </>
  );
};
import { Logo } from "./sastLink";
import { GithubIcon } from "./githubIcon";
import { MsIcon } from "./msIcon";
import { QqIcon } from "./qqIcon";

export { CenterIcon, GithubIcon, MsIcon, QqIcon, Logo };
