import { StaticImageData } from "next/image";
import { Icon24 } from "../icon";
import classNames from "classnames";
import styles from "./index.module.scss";
import { Icon, arrowheadIcon } from "../icon";
import { message } from "@/components/message";

const BindAppItem = (props: {
  bindAppIconProps: { src: StaticImageData | string; alt: string };
  bindAppTitle: string;
  binded: boolean;
}) => {
  const { bindAppIconProps, bindAppTitle, binded } = props;
  return (
    <div className={classNames(styles.bindApp)}>
      <div className={classNames(styles.appMessage)}>
        <Icon24 {...bindAppIconProps} />
        <span>{bindAppTitle}</span>
      </div>
      {binded ? (
        <div className={classNames(styles.binded)}>已绑定</div>
      ) : (
        <div onClick={()=>{
          message.warning('暂未开放')
        }} className={classNames(styles.unbinded)}>
          <span>未绑定</span>
          <Icon {...arrowheadIcon} />
        </div>
      )}
    </div>
  );
};

export { BindAppItem };
