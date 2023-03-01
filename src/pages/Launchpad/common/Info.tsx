import { PropsWithChildren } from "react";
import Status from "components/Status";

type Props = PropsWithChildren<{
  classes?: string;
}>;

export function Info({ classes = "", children }: Props) {
  return (
    <Status
      inline
      classes={classes + " text-sm text-gray-l2 dark:text-gray mr-2"}
      icon="Info"
      iconOptions={{
        size: 18,
        className: "mr-2 bottom-[2px]",
      }}
    >
      {children}
    </Status>
  );
}
