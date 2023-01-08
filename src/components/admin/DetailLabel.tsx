import { PropsWithChildren } from "react";

export function DetailLabel(props: PropsWithChildren<{ classes?: string }>) {
  return (
    <p
      className={`${
        props.classes || ""
      } text-xs font-bold uppercase font-heading mb-1`}
    >
      {props.children}
    </p>
  );
}
