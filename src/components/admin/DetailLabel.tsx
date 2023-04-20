import { PropsWithChildren } from "react";

export function DetailLabel(props: PropsWithChildren<{ classes?: string }>) {
  return (
    <p
      className={`${
        props.classes || ""
      } text-sm font-bold uppercase flex items-center font-heading border border-prim rounded bg-orange-l5 dark:bg-blue-d7 p-4 mt-4`}
    >
      {props.children}
    </p>
  );
}
