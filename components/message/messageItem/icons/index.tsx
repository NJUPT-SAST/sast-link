import info from "@/public/svg/message-info.svg";
import error from "@/public/svg/message-error.svg";
import success from "@/public/svg/message-success.svg";
import warning from "@/public/svg/message-warning.svg";
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
      <Image src={error} alt="error message icon" height={16} width={16} />
    </>
  );
};

const Success = () => {
  return (
    <>
      <Image src={success} alt="success message icon" height={16} width={16} />
    </>
  );
};

const Warning = () => {
  return (
    <>
      <Image src={warning} alt="warning message icon" height={16} width={16} />
    </>
  );
};

export { Info, Success, Error, Warning };
