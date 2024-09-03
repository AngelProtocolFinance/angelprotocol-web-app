import type { PropsWithChildren } from "react";
import Status from "./Status";

type Props = PropsWithChildren<{
  classes?: string;
}>;

export function Confirmed({ classes = "", children }: Props) {
  return (
    <Status
      inline
      classes={classes + " text-sm text-green mr-2"}
      icon="Check"
      iconOptions={{
        size: 16,
        className: "mr-2",
      }}
    >
      {children}
    </Status>
  );
}
