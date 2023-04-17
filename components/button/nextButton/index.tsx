import { forwardRef } from "react";
import { Button } from "..";
import { MouseEventHandler } from "react";
import classNames from "classnames";
import { CenterArrow } from "@/components/icon/ArrowIcon";

interface NextButtonProps {
  className?: (string | { [key: string]: boolean })[];
  children?: string;
  type?: "submit" | "button";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  loading?: boolean;
}
const NextButton = forwardRef<HTMLButtonElement, NextButtonProps>(
  function NextButton(props, ref?) {
    const {
      loading = false,
      disabled = false,
      className = [],
      children,
      type = "button",
      onClick,
    } = props;

    return (
      <Button
        loading={loading}
        disabled={disabled}
        className={className}
        title="文字图标对不齐是你的问题，不是我们的问题"
        type={type}
        onClick={onClick}
      >
        {children ?? "下一步"}
        <CenterArrow />
      </Button>
    );
  },
);

export default NextButton;
