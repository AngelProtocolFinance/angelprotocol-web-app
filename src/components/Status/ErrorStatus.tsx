import { CircleAlert } from "lucide-react";
import Status from "./Status";
import type { StatusProps } from "./types";

export function ErrorStatus({
  classes = "",
  children,
}: Omit<StatusProps, "icon">) {
  return (
    <Status
      classes={`text-red dark:text-red-l2 ${classes}`}
      icon={<CircleAlert />}
    >
      {children}
    </Status>
  );
}
