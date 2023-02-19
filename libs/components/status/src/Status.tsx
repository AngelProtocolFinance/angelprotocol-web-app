import Icon, { IconType, icons } from "@ap/components/icon";
import { StatusProps } from "./types";

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
