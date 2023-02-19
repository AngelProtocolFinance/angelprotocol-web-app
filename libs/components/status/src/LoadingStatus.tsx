import Icon, { IconType } from "@/components/Icon";
import { StatusProps } from "./types";
import Status from "./Status";

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
