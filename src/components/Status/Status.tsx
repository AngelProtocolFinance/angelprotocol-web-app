import { IconType } from "../Icon";
import Icon, { icons } from "../Icon";
import { StatusProps } from "./types";

export default function Status<T extends IconType | JSX.Element>({
  icon,
  inline = false,
  iconOptions,
  classes = "",
  gap = "gap-2",
  children,
}: StatusProps<T>) {
  const { className = "", ...options } = iconOptions || {};
  return (
    <div className={`${classes} ${gap} ${inline ? "" : "flex items-center"}`}>
      {isIconProps(icon) ? (
        <Icon
          {...options}
          type={icon}
          className={`${className} ${inline ? "inline-block relative" : ""}`}
        />
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
