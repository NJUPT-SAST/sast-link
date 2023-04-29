import "react";
declare module "react" {
  interface CSSProperties {
    "--content-after"?: string;
    "--content-before"?: string;
    "--time-delay"?: string;
  }
}
