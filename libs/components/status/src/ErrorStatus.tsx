import Icon, { IconType } from "@ap/components/icon";
import { StatusProps } from "./types";
import Status from "./Status";

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
