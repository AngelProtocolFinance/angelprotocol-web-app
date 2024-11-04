import { CircleAlert } from "lucide-react";
import type { PropsWithChildren } from "react";
import Status from "./Status";

type Props = PropsWithChildren<{
  classes?: string;
}>;

export default function Info({ classes = "", children }: Props) {
  return (
    <Status
      inline
      classes={classes + " text-sm text-navy-l1 dark:text-navy-l2 mr-2"}
      icon={
        <CircleAlert
          size={16}
          className="mr-2 bottom-[2px] inline-block relative"
        />
      }
    >
      {children}
    </Status>
  );
}
