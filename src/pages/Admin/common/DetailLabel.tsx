import { PropsWithChildren } from "react";

export default function DetailLabel(
  props: PropsWithChildren<{ classes?: string }>
) {
  return (
    <p
      className={`${
        props.classes || ""
      } text-xs font-bold text-white-grey uppercase font-heading`}
    >
      {props.children}
    </p>
  );
}
