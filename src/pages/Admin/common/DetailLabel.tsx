import { PropsWithChildren } from "react";

export default function DetailLabel(props: PropsWithChildren<{}>) {
  return (
    <p className="text-xs font-bold text-white-grey uppercase font-heading">
      {props.children}
    </p>
  );
}
