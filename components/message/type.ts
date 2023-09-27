export interface MessageLinkType {
  timer: NodeJS.Timer;
  isTail: boolean;
  before: MessageLinkType | null;
  next: MessageLinkType;
  message: MessageItemPropsType;
  this: MessageLinkType;
}

export type IconType = "error" | "info" | "success" | "warning" | "loading";

export interface MessageItemPropsType {
  delay: number;
  content: string;
  icon: IconType;
}
