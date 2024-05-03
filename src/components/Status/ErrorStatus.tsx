import Icon, { type IconType } from "../Icon";
import Status from "./Status";
import type { StatusProps } from "./types";

export function ErrorStatus({
  classes = "",
  children,
  iconOptions: icon,
}: Omit<StatusProps<IconType>, "icon">) {
  return (
    <Status
      classes={`text-red dark:text-red-l2 ${classes}`}
      icon={<Icon {...icon} type="Info" />}
    >
      {children}
    </Status>
  );
}
