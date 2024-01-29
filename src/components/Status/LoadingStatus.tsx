import Icon, { IconType } from "../Icon";
import Status from "./Status";
import { StatusProps } from "./types";

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
          type="Loading"
          className={`animate-spin ${icon?.className || ""}`}
        />
      }
    >
      {children}
    </Status>
  );
}
