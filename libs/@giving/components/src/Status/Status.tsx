import { StatusProps } from "./types";
import { IconType } from "../Icon";
import Icon, { icons } from "../Icon";

export default function Status<T extends IconType | JSX.Element>({
  icon,
  iconOptions,
  classes = "",
  gap = "gap-2",
  children,
}: StatusProps<T>) {
  return (
    <div className={`${classes} ${gap} flex items-center`}>
      {isIconProps(icon) ? (
        <Icon type={icon} {...(iconOptions as any)} />
      ) : (
        (icon as JSX.Element)
      )}
      <span>{children}</span>
    </div>
  );
}

function isIconProps(val: any): val is IconType {
  return typeof val === "string" && val in icons;
}
