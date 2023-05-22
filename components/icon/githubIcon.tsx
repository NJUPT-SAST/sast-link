import github from "@/public/svg/github.svg";
import Image from "next/image";

export function GithubIcon() {
  return <Image src={github} alt={`github icon`} />;
}
