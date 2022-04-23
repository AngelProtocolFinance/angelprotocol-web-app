import { PropsWithChildren } from "react";

export default function Header(props: PropsWithChildren<{}>) {
  return (
    <p className="text-xs font-heading uppercase border-b border-white/20 mt-4 first:mt-0 mb-1 p-0.5">
      {props.children}
    </p>
  );
}
