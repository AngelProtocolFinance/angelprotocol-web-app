import { PropsWithChildren } from "react";

export function DetailLabel(props: PropsWithChildren<{ classes?: string }>) {
  return (
    <p
      className={`${
        props.classes || ""
      } text-xs font-bold text-white uppercase font-heading`}
    >
      {props.children}
    </p>
  );
}
