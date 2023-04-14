import Image from "next/image";
import arrow from "@/public/svg/Arrow.svg"

const CenterArrow = () => {
  return (
    <span style={{ display: "inline-flex", alignItems: "center" }}>
      <Image src={arrow} alt={`vertcle icon`} height={22} width={22} />
    </span>
  );
};

export { CenterArrow };