import { forwardRef } from "react";
import { Button } from "..";
import Image from "next/image";
import arrow from "../../../public/svg/Arrow.svg";
import { MouseEventHandler } from "react";

interface NextButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
const NextButton = forwardRef<HTMLButtonElement, NextButtonProps>(
  function NextButton(props, ref?) {
    const { onClick } = props;

    return (
      <Button
        title="文字图标对不齐是你的问题，不是我们的问题"
        type="button"
        onClick={onClick}
      >
        下一步
        <span style={{ display: "inline-flex", alignItems: "center" }}>
          <Image src={arrow} alt={`vertcle icon`} height={22} width={22} />
        </span>
      </Button>
    );
  },
);

export default NextButton;
