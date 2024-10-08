import Icon, { type IconType } from "../Icon";
import Status from "./Status";
import type { StatusProps } from "./types";

export function LoadingStatus({
  classes,
  children,
  iconOptions: icon,
}: Omit<StatusProps<IconType>, "icon">) {
  return (
    <Status
      classes={classes}
      icon={
        <Icon
          {...icon}
          size={icon?.size ?? 20}
          type="Loading"
          className={`animate-spin ${icon?.className || ""}`}
        />
      }
    >
      {children}
    </Status>
  );
}
