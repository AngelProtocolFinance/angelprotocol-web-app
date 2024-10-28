import { LoaderCircle } from "lucide-react";
import Status from "./Status";
import type { StatusProps } from "./types";

export function LoadingStatus({
  classes,
  children,
}: Omit<StatusProps, "icon">) {
  return (
    <Status
      classes={classes}
      icon={<LoaderCircle size={20} className="animate-spin" />}
    >
      {children}
    </Status>
  );
}
