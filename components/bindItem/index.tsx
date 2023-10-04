import { StaticImageData } from "next/image";
import { Icon24 } from "../icon";
import classNames from "classnames";
import styles from "./index.module.scss";

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
        <div className={classNames(styles.unbinded)}>未绑定</div>
      )}
    </div>
  );
};

export { BindAppItem };
