import info from "@/public/svg/message-info.svg";
import error from "@/public/svg/message-error.svg";
import success from "@/public/svg/message-success.svg";
import Image from "next/image";

const Info = () => {
  return (
    <>
      <Image src={info} alt="info message icon" height={16} width={16} />
    </>
  );
};

const Error = () => {
  return (
    <>
      <Image src={success} alt="info message icon" height={16} width={16} />
    </>
  );
};

const Success = () => {
  return (
    <>
      <Image src={success} alt="info message icon" height={16} width={16} />
    </>
  );
};

export { Info, Success, Error };
