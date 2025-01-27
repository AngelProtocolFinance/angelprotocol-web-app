import { CircleCheck } from "lucide-react";
import type { PropsWithChildren } from "react";
import Status from "./status";

type Props = PropsWithChildren<{
  classes?: string;
}>;

export function Confirmed({ classes = "", children }: Props) {
  return (
    <Status
      inline
      classes={classes + " text-sm text-green mr-2"}
      icon={<CircleCheck size={16} className="mr-2 inline-block relative" />}
    >
      {children}
    </Status>
  );
}
