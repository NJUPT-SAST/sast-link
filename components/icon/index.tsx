import Image from "next/image";
import type { StaticImageData } from "next/image";
import { Logo } from "./sastLink";
import { GithubIcon } from "./githubIcon";
import { MsIcon } from "./msIcon";
import { QqIcon } from "./qqIcon";
import { MenuIcon } from "./menu";
import { MouseEventHandler } from "react";

interface IconProps {
  src: string | StaticImageData;
  alt: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLImageElement>;
}

export const Icon16 = (props: IconProps) => {
  return (
    <Image
      className={props.className}
      onClick={props.onClick}
      src={props.src}
      alt={props.alt}
      width={16}
      height={16}
    />
  );
};

export const Icon24 = (props: IconProps) => {
  return (
    <Image
      onClick={props.onClick}
      src={props.src}
      alt={props.alt}
      width={24}
      height={24}
    />
  );
};

export const Icon32 = (props: IconProps) => {
  return (
    <Image
      onClick={props.onClick}
      src={props.src}
      alt={props.alt}
      width={32}
      height={32}
    />
  );
};

export const Icon = Image;

export { GithubIcon, MsIcon, QqIcon, Logo, MenuIcon };

/*
New Icon export pattern
*/

import qq from "@public/svg/qq.svg";
export const qqIcon = { src: qq, alt: "qq icon" };

import github from "@public/svg/github.svg";
export const githubIcon = { src: github, alt: "github icon" };

import feishu from "@public/svg/feishu.svg";
export const feishuIcon = { src: feishu, alt: "feishu icon" };

import ms from "@public/svg/ms.svg";
export const msIcon = { src: ms, alt: "microsoft icon" };

import arrowhead from "@public/svg/arrowhead.svg";
export const arrowheadIcon = { src: arrowhead, alt: "arrowhead icon" };

import arrowhead_black from "@public/svg/arrowhead-b.svg";
export const blackArrowheadIcon = {
  src: arrowhead_black,
  alt: "black arrowhead icon",
};

import avatar from "@public/defaultAvatar.png";
export const avatarIcon = {
  src: avatar,
  alt: "default user avatar",
};

import camera from "@public/svg/camera.svg";
export const cameraIcon = {
  src: camera,
  alt: "camera icon",
};
