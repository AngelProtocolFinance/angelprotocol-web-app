import { PropsWithChildren } from "react";
import { StatusProps } from "./types";
import Icon, { IconTypes } from "../Icon";

export function Status({
  icon,
  classes = "",
  gap = "gap-2",
  children,
}: StatusProps) {
  return (
    <div className={`${classes} ${gap} flex items-center`}>
      {isIconType(Icon) ? <Icon type={icon as IconTypes} /> : icon}
      <span>{children}</span>
    </div>
  );
}

function isIconType(val: any): val is IconTypes {
  return typeof val === "string"; // && val in icons;
}
