import { PropsWithChildren } from "react";
import Status from "./Status";

type Props = PropsWithChildren<{
  classes?: string;
}>;

export default function Info({ classes = "", children }: Props) {
  return (
    <Status
      inline
      classes={`${classes} text-sm text-gray-d1 dark:text-gray mr-2`}
      icon="Info"
      iconOptions={{
        size: 16,
        className: "mr-2 bottom-[2px]",
      }}
    >
      {children}
    </Status>
  );
}
